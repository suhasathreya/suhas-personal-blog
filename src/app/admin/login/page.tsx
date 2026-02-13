"use client";

import { Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function LoginContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (session) {
      router.push("/admin");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="text-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error === "AccessDenied"
            ? "Access denied. Only authorized emails can log in."
            : "An error occurred. Please try again."}
        </div>
      )}

      <button
        onClick={() => signIn("google", { callbackUrl: "/admin" })}
        className="px-4 py-2 border border-current hover:bg-gray-100 transition-colors"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
