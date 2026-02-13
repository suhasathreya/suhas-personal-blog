import Link from "next/link";
import { getAllPosts } from "@/lib/db";
import DeletePostButton from "./DeletePostButton";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4 items-center">
          <Link
            href="/admin/posts/new"
            className="px-4 py-2 border border-current hover:bg-gray-100 transition-colors no-underline"
          >
            New Post
          </Link>
          <LogoutButton />
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet. Create your first post!</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex justify-between items-center py-3 border-b border-gray-200"
            >
              <div>
                <Link href={`/posts/${post.slug}`} className="font-medium">
                  {post.title}
                </Link>
                <span className="text-gray-500 ml-3 text-sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-3 text-sm">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="hover:opacity-70"
                >
                  Edit
                </Link>
                <DeletePostButton postId={post.id} postTitle={post.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
