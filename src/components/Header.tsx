"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/posts", label: "Posts" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mb-10">
      <nav className="flex gap-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={isActive ? "font-bold no-underline" : "no-underline"}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
