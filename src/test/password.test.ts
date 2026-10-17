import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/neon.server";

describe("Password verification", () => {
  it("accepts the registered password", async () => {
    const hash = await hashPassword("example-password-123");
    expect(await verifyPassword("example-password-123", hash)).toBe(true);
  });
  it("rejects an incorrect password", async () => {
    const hash = await hashPassword("example-password-123");
    expect(await verifyPassword("wrong-password", hash)).toBe(false);
  });
  it("rejects invalid stored hashes", async () => {
    expect(await verifyPassword("example-password-123", "invalid")).toBe(false);
  });
});