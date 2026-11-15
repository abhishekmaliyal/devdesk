import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "./db";
import * as schema from "./db/schema";

const secret = process.env.BETTER_AUTH_SECRET;

if (!secret) {
  throw new Error("BETTER_AUTH_SECRET is not configured");
}

export const auth = betterAuth({
  appName: "DevDesk",

  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  secret,

  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },
});
