import { describe, expect, it } from "vitest";
import { blockedReply, detectBlockedReplyLanguage } from "./blockedReply";

describe("blocked replies", () => {
  it("uses English for an English message", () => {
    expect(detectBlockedReplyLanguage("hello idiot")).toBe("en");
    expect(blockedReply("hello idiot")).toBe(
      "No need for that. Feel free to ask about my work, projects, or experience.",
    );
  });

  it("uses Spanish for accented Spanish", () => {
    expect(detectBlockedReplyLanguage("¿por qué sos así?")).toBe("es");
  });

  it("uses Spanish for common unaccented Spanish", () => {
    expect(detectBlockedReplyLanguage("hola idiota")).toBe("es");
    expect(blockedReply("hola idiota")).toBe(
      "No hace falta hablar así. Si querés, preguntame sobre mi trabajo, proyectos o experiencia.",
    );
  });
});
