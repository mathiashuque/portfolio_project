import { describe, expect, it } from "vitest";
import { clampToLast3Pairs, type StoredMsg } from "./history";

describe("clampToLast3Pairs", () => {
  it("keeps only the last three user/assistant pairs", () => {
    const history: StoredMsg[] = [
      { role: "user", content: "question 1" },
      { role: "assistant", content: "answer 1" },
      { role: "user", content: "question 2" },
      { role: "assistant", content: "answer 2" },
      { role: "user", content: "question 3" },
      { role: "assistant", content: "answer 3" },
      { role: "user", content: "question 4" },
      { role: "assistant", content: "answer 4" },
    ];

    expect(clampToLast3Pairs(history)).toEqual(history.slice(2));
  });
});
