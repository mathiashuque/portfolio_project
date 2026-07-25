# OpenAI chatbot cleanup and daily health check

You are working in a Next.js 16 / TypeScript portfolio repository deployed to Vercel. Implement the changes below. Start by inspecting the repository and its current working tree. Preserve all unrelated existing changes; do not reset, discard, or reformat work outside this task.

## Current architecture

- The chatbot HTTP endpoint is `app/api/chatbot/route.ts`.
- Its OpenAI integration is in `app/api/chatbot/Agent.ts`.
- Short conversation history and rate limits are stored in Upstash Redis.
- The portfolio information is a small static prompt in `app/api/chatbot/portfolioContext.ts`; there is no vector store or retrieval step.
- The chatbot uses `@openai/agents`, `openai`, `gpt-5-nano`, low reasoning effort, OpenAI moderation, input/output guardrails, and Agents SDK tracing.
- `app/api/health/route.ts` already exposes `GET /api/health` and supports `?service=openai`. The OpenAI check calls `GET https://api.openai.com/v1/models` using `OPENAI_API_KEY`, so it verifies API reachability and key authentication without running a paid model generation.
- Production is `https://www.mathiashuque.dev/`.
- `HEALTHCHECK_TOKEN` optionally protects the health endpoint with a bearer token.

Do not introduce Genkit. It would duplicate the orchestration and tracing already present for this single-agent workflow. Do not change the selected OpenAI model or the chatbot's intended behavior.

## Required implementation

### 1. Reuse the Agents SDK runner

In `app/api/chatbot/Agent.ts`, create one module-level `Runner` and reuse it across requests instead of constructing a new runner inside `runWorkflow()`.

Keep the existing trace metadata and workflow trace naming unless the SDK makes one of them redundant. Preserve tracing.

### 2. Eliminate duplicate input moderation

At present, an accepted user message is sent to the moderation API once before `runner.run()` and again by the input guardrail.

- Keep the deterministic profanity check.
- Keep the Agents SDK input guardrail with `runInParallel: false`, so moderation finishes before model execution.
- Keep the output moderation guardrail.
- Remove the redundant pre-run OpenAI moderation request.
- An ordinary accepted request should invoke OpenAI moderation exactly once for input and once for final output.
- A message caught by the deterministic profanity regex should not call the model.
- Preserve the existing friendly blocked response and tripwire handling.

Remove or correct comments that refer to retrieval, vector stores, or retrieval cost; this project has no retrieval step.

### 3. Remove obsolete Chat Completions history code

In `app/api/chatbot/history.ts`, remove the unused `toAgentMessages()` function and its `ChatCompletionMessageParam` import. Keep `StoredMsg` and `clampToLast3Pairs()`.

Do not migrate the working Agents SDK input-item mapping to Chat Completions.

### 4. Make blocked replies reliably bilingual

The current blocked-response detector treats Spanish as Spanish only when the message contains accented characters. Improve this without adding a heavy language-detection dependency solely for this path.

At minimum, common unaccented Spanish input such as `hola idiota` must produce the Spanish blocked reply, while an English equivalent must produce the English reply. Keep the implementation deterministic and easy to test. Do not rely on an LLM call for language detection.

If the existing UI locale can be passed to the API cleanly and validated as `en | es`, it may be used as a strong signal, with text detection as a fallback. Avoid broad UI refactors.

### 5. Add focused automated tests

The repository currently has no chatbot test suite. Add a lightweight test setup appropriate for this TypeScript/Next.js project (prefer Vitest unless the repository already contains another test framework by execution time).

Cover at least:

- history is clamped to the last three user/assistant pairs;
- English and Spanish blocked replies, including unaccented Spanish;
- the deterministic profanity path does not run the model;
- a clean message is not moderated twice on input;
- input and output guardrail tripwires return the blocked reply.

Structure or export small pure helpers where needed for testing, but do not expose internal helpers through a public HTTP API. Mock network/OpenAI calls; tests must never use a real API key or make external requests.

Add an `npm test` script suitable for CI. Do not weaken existing lint or TypeScript rules.

### 6. Add an independent daily OpenAI health check

Create `.github/workflows/daily-openai-healthcheck.yml`.

Requirements:

- Run once per day using `schedule`.
- Also support `workflow_dispatch` for manual testing.
- Do not check out the repository or install Node; this job only needs to call the deployed endpoint.
- Call:

  `https://www.mathiashuque.dev/api/health?service=openai`

- Use a short network timeout and make the job fail on DNS/network failures, non-2xx HTTP responses, `401`, or the endpoint's existing `503`.
- Send `Authorization: Bearer <token>` only when the GitHub Actions secret `HEALTHCHECK_TOKEN` is non-empty. Never put the token in the query string or logs.
- Print enough of a successful response to make a manual run useful, but do not print secrets.
- Give the workflow and job descriptive names. GitHub's normal failed-workflow notification is the initial alerting mechanism; do not add email, Slack, or another paid monitoring service.
- Account for GitHub Actions schedules being expressed in UTC and document the chosen UTC run time.

This scheduled job must test the deployed application from outside Vercel. Do not replace it with a Vercel cron that calls code inside the same deployment.

### 7. Documentation

Update `README.md` to document:

- that the existing OpenAI health endpoint validates reachability and API-key authentication via `/v1/models`, not a generation request;
- the daily GitHub Actions health check;
- how to trigger it manually;
- that `HEALTHCHECK_TOKEN` must be configured both in Vercel and as a GitHub Actions repository secret when endpoint protection is enabled;
- that a failed scheduled workflow is the alert;
- the new test command.

Do not include real credentials.

## Validation

Run and report:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Use placeholder environment values for the build only if the existing build requires them; do not write or commit secrets. Ensure the scheduled workflow YAML is syntactically valid.

Review the final diff for accidental changes. Do not commit or push unless explicitly asked.

## Acceptance criteria

- No Genkit dependency or code is added.
- The existing chatbot API contract remains compatible.
- One reusable `Runner` is used.
- Accepted inputs are not sent twice to input moderation.
- Input/output safety behavior remains in place.
- Stale vector-store/retrieval comments and unused Chat Completions history code are gone.
- Blocked English and unaccented Spanish messages receive the correct language response.
- Focused tests pass without external API calls.
- A daily, manually runnable GitHub Actions workflow checks only the production OpenAI health endpoint and fails visibly when it is unhealthy.
- Documentation explains configuration, manual execution, and alert behavior.
