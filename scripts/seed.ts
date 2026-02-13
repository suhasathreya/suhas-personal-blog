import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function seed() {
  // Create table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Check if test post exists
  const existing = await db.execute({
    sql: "SELECT * FROM posts WHERE slug = ?",
    args: ["hello-world"],
  });

  if (existing.rows.length === 0) {
    // Insert test post
    await db.execute({
      sql: "INSERT INTO posts (title, slug, content) VALUES (?, ?, ?)",
      args: [
        "Hello World",
        "hello-world",
        `# Hello World

This is my first blog post. Welcome to my corner of the internet.

## What to expect

I'll be writing about:
- AI engineering and automation
- Product thinking
- Whatever else I find interesting

Stay tuned.`,
      ],
    });

    console.log("Seed data created successfully!");
  } else {
    console.log("Test post already exists, skipping seed.");
  }
}

seed().catch(console.error);
