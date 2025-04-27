import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.TURSO_CONNECTION_URL) {
  throw new Error("TURSO_CONNECTION_URL is not defined");
}

export default defineConfig({
  dialect: "turso",
  schema: "./src/db/schemas.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_TOKEN,
  },
});
