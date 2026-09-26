import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add the Postgres connection string from Neon or Vercel Postgres to your environment before using the database.",
    );
  }

  return drizzle(neon(databaseUrl), { schema });
}
