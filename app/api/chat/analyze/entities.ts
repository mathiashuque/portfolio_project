// src/app/api/chat/analyze/entities.ts
import { knowledge } from "../knowledge";

export function extractEntities(text: string) {
  const lower = text.toLowerCase();

  const project = knowledge.projects.find((p) =>
    lower.includes(p.name.toLowerCase())
  );

  const allSkills = [
    ...knowledge.stack.programmingLanguages,
    ...knowledge.stack.frontend,
    ...knowledge.stack.backend,
    ...knowledge.stack.databases,
    ...knowledge.stack.cloudAndDevOps,
    ...knowledge.stack.testing,
    ...knowledge.stack.methodologiesAndTools,
  ].map((s) => s.toLowerCase());

  const mentionedSkills = allSkills.filter((s) => lower.includes(s));

  return {
    projectName: project?.name,
    mentionedSkills: mentionedSkills.slice(0, 5),
  };
}
