import Link from "next/link";
import { getAllPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <article>
      <h1 className="text-2xl font-bold mb-6">Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`} className="block">
                <span className="font-medium">{post.title}</span>
                <span className="text-gray-500 ml-3 text-sm">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
