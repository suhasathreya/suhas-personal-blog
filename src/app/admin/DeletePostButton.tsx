"use client";

import { useRouter } from "next/navigation";

interface Props {
  postId: number;
  postTitle: string;
}

export default function DeletePostButton({ postId, postTitle }: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }

    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete post");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:opacity-70"
    >
      Delete
    </button>
  );
}
