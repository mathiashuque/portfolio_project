import { afterEach, describe, expect, it, vi } from "vitest";
import { requestChatReply } from "./api";

function mockFetch(response: unknown) {
  const fetchMock = vi.fn(() => Promise.resolve(response) as never);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("requestChatReply", () => {
  it("returns the assistant answer on 200", async () => {
    mockFetch(jsonResponse(200, { answer: "hola" }));

    await expect(requestChatReply("hi")).resolves.toEqual({
      kind: "answer",
      text: "hola",
    });
  });

  it("accepts a payload that only carries `reply`", async () => {
    mockFetch(jsonResponse(200, { reply: "fallback" }));

    await expect(requestChatReply("hi")).resolves.toEqual({
      kind: "answer",
      text: "fallback",
    });
  });

  it("reports an empty payload instead of inventing a message", async () => {
    mockFetch(jsonResponse(200, {}));

    await expect(requestChatReply("hi")).resolves.toEqual({ kind: "empty" });
  });

  it("posts the message to /api/chatbot", async () => {
    const fetchMock = mockFetch(jsonResponse(200, { answer: "ok" }));

    await requestChatReply("que proyectos tenes?");

    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe("/api/chatbot");
    expect(init.method).toBe("POST");
    expect(JSON.parse(String(init.body))).toEqual({
      message: "que proyectos tenes?",
    });
  });

  it("classifies 429 as rate_limited", async () => {
    mockFetch(jsonResponse(429, { error: "rate_limited" }));

    await expect(requestChatReply("hi")).resolves.toEqual({
      kind: "rate_limited",
    });
  });

  it("classifies any other non-ok status as error", async () => {
    mockFetch(jsonResponse(500, { error: "boom" }));

    await expect(requestChatReply("hi")).resolves.toEqual({ kind: "error" });
  });

  it("classifies a network failure as error", async () => {
    const fetchMock = vi.fn(() => Promise.reject(new Error("offline")));
    vi.stubGlobal("fetch", fetchMock);

    await expect(requestChatReply("hi")).resolves.toEqual({ kind: "error" });
  });
});
