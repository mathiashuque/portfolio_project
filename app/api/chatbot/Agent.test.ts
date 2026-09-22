import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

type GuardrailResult = {
  tripwireTriggered: boolean;
};

type Guardrail = {
  execute(args: Record<string, unknown>): Promise<GuardrailResult>;
};

type AgentOptions = {
  inputGuardrails: Guardrail[];
  outputGuardrails: Guardrail[];
};

const state = vi.hoisted(() => ({
  finalOutput: "Safe portfolio response",
  modelRuns: 0,
  moderationFlags: [] as boolean[],
  moderationsCreate: vi.fn(),
  runnerConstructions: 0,
  runnerRuns: 0,
}));

vi.mock("openai", () => ({
  OpenAI: class {
    moderations = {
      create: state.moderationsCreate,
    };
  },
}));

vi.mock("@openai/agents", () => {
  class InputGuardrailTripwireTriggered extends Error {}
  class OutputGuardrailTripwireTriggered extends Error {}

  class Agent {
    constructor(public options: AgentOptions) {}
  }

  class Runner {
    constructor() {
      state.runnerConstructions += 1;
    }

    async run(agent: Agent, input: unknown) {
      state.runnerRuns += 1;

      const inputResult = await agent.options.inputGuardrails[0].execute({
        input,
      });
      if (inputResult.tripwireTriggered) {
        throw new InputGuardrailTripwireTriggered();
      }

      state.modelRuns += 1;

      const outputResult = await agent.options.outputGuardrails[0].execute({
        agentOutput: state.finalOutput,
      });
      if (outputResult.tripwireTriggered) {
        throw new OutputGuardrailTripwireTriggered();
      }

      return { finalOutput: state.finalOutput };
    }
  }

  return {
    Agent,
    InputGuardrailTripwireTriggered,
    OutputGuardrailTripwireTriggered,
    Runner,
    withTrace: (_name: string, work: () => unknown) => work(),
  };
});

const originalOpenAIApiKey = process.env.OPENAI_API_KEY;
delete process.env.OPENAI_API_KEY;

const { runWorkflow } = await import("./Agent");

beforeEach(() => {
  process.env.OPENAI_API_KEY = "test-api-key";
  state.finalOutput = "Safe portfolio response";
  state.modelRuns = 0;
  state.moderationFlags = [];
  state.runnerRuns = 0;
  state.moderationsCreate.mockImplementation(async () => ({
    results: [{ flagged: state.moderationFlags.shift() ?? false }],
  }));
});

afterAll(() => {
  if (originalOpenAIApiKey === undefined) {
    delete process.env.OPENAI_API_KEY;
  } else {
    process.env.OPENAI_API_KEY = originalOpenAIApiKey;
  }
});

describe("runWorkflow safety behavior", () => {
  it("reports missing credentials at request time instead of module load", async () => {
    delete process.env.OPENAI_API_KEY;

    await expect(runWorkflow({ input_as_text: "hello" })).rejects.toThrow(
      "Set OPENAI_API_KEY.",
    );

    expect(state.modelRuns).toBe(0);
    expect(state.moderationsCreate).not.toHaveBeenCalled();
  });

  it("reuses a single module-level runner across requests", async () => {
    await runWorkflow({ input_as_text: "hello" });
    await runWorkflow({ input_as_text: "tell me about your work" });

    expect(state.runnerConstructions).toBe(1);
    expect(state.runnerRuns).toBe(2);
  });

  it("does not run the model or call moderation for deterministic profanity", async () => {
    const result = await runWorkflow({ input_as_text: "hello asshole" });

    expect(result.answer).toContain("No need for that");
    expect(state.runnerRuns).toBe(0);
    expect(state.modelRuns).toBe(0);
    expect(state.moderationsCreate).not.toHaveBeenCalled();
  });

  it("moderates a clean input once and the final output once", async () => {
    const input = "tell me about your work";
    const result = await runWorkflow({ input_as_text: input });

    expect(result).toEqual({ answer: state.finalOutput });
    expect(state.modelRuns).toBe(1);
    expect(state.moderationsCreate).toHaveBeenCalledTimes(2);
    expect(
      state.moderationsCreate.mock.calls.map(([request]) => request.input),
    ).toEqual([input, state.finalOutput]);
  });

  it("returns the blocked reply when the input guardrail trips", async () => {
    state.moderationFlags = [true];

    const result = await runWorkflow({ input_as_text: "hola, como estas" });

    expect(result.answer).toContain("No hace falta hablar así");
    expect(state.modelRuns).toBe(0);
    expect(state.moderationsCreate).toHaveBeenCalledTimes(1);
  });

  it("returns the blocked reply when the output guardrail trips", async () => {
    state.moderationFlags = [false, true];

    const result = await runWorkflow({ input_as_text: "hello" });

    expect(result.answer).toContain("No need for that");
    expect(state.modelRuns).toBe(1);
    expect(state.moderationsCreate).toHaveBeenCalledTimes(2);
  });
});
