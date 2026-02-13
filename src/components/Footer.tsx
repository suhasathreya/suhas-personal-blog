import Link from "next/link";

const socialLinks = [
  {
    href: "mailto:athreyasuhas30@gmail.com",
    label: "Email",
    icon: "✉",
  },
  {
    href: "https://www.linkedin.com/in/suhas-athreya/",
    label: "LinkedIn",
    icon: "in",
  },
  {
    href: "https://github.com/suhasathreya",
    label: "GitHub",
    icon: "gh",
  },
  {
    href: "https://x.com/donquixotical",
    label: "X",
    icon: "𝕏",
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-gray-200">
      <div className="flex justify-center gap-8 text-xl">
        {socialLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="no-underline hover:opacity-70"
            title={link.label}
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </footer>
  );
}
