import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize table
async function initDb() {
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
}

// Run init on module load
initDb().catch(console.error);

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const result = await db.execute(
    "SELECT * FROM posts ORDER BY created_at DESC"
  );
  return result.rows as unknown as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE slug = ?",
    args: [slug],
  });
  return result.rows[0] as unknown as Post | undefined;
}

export async function getPostById(id: number): Promise<Post | undefined> {
  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE id = ?",
    args: [id],
  });
  return result.rows[0] as unknown as Post | undefined;
}

export async function createPost(
  title: string,
  slug: string,
  content: string
): Promise<Post> {
  const result = await db.execute({
    sql: "INSERT INTO posts (title, slug, content) VALUES (?, ?, ?)",
    args: [title, slug, content],
  });
  const post = await getPostById(Number(result.lastInsertRowid));
  return post!;
}

export async function updatePost(
  id: number,
  title: string,
  slug: string,
  content: string
): Promise<Post | undefined> {
  await db.execute({
    sql: "UPDATE posts SET title = ?, slug = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    args: [title, slug, content, id],
  });
  return getPostById(id);
}

export async function deletePost(id: number): Promise<boolean> {
  const result = await db.execute({
    sql: "DELETE FROM posts WHERE id = ?",
    args: [id],
  });
  return result.rowsAffected > 0;
}

export default db;
