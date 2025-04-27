import { drizzle } from "drizzle-orm/libsql";

if (!process.env.TURSO_CONNECTION_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const db = drizzle({
  connection: {
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_TOKEN,
  },
});

export default db;
