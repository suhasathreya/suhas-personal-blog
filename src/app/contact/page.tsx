import Link from "next/link";

export default function ContactPage() {
  return (
    <article>
      <h1 className="text-2xl font-bold mb-6">Contact</h1>

      <div className="space-y-3">
        <p>
          <Link href="mailto:athreyasuhas30@gmail.com">
            athreyasuhas30@gmail.com
          </Link>
        </p>

        <p>
          <Link
            href="https://www.linkedin.com/in/suhas-athreya/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
        </p>

        <p>
          <Link
            href="https://github.com/suhasathreya"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </p>

        <p>
          <Link
            href="https://x.com/donquixotical"
            target="_blank"
            rel="noopener noreferrer"
          >
            X / Twitter
          </Link>
        </p>
      </div>
    </article>
  );
}
