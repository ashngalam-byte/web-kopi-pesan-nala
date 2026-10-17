import { getRequestUrl, useSession, setResponseHeader } from "@tanstack/react-start/server";
import { neonQuery } from "./neon.server";

export async function userSession() {
  const password = process.env["SESSION_SECRET"];
  if (!password) throw new Error("Missing SESSION_SECRET");
  setResponseHeader("Cache-Control", "no-store");
  const url = getRequestUrl();
  return useSession<{ userId?: string }>({
    name: "account-session",
    password,
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, sameSite: "lax", secure: url.hostname !== "localhost" && url.hostname !== "127.0.0.1", path: "/" },
  });
}

export async function sessionUser() {
  const session = await userSession();
  if (!session.data.userId) return null;
  const result = await neonQuery("select id, name, email from public.users where id = $1 limit 1", [session.data.userId]);
  const row = result.rows[0];
  if (!row) { await session.clear(); return null; }
  return { id: String(row["id"]), name: String(row["name"]), email: String(row["email"]) };
}