"use client";
import React from "react";
import Link from "next/link";
import { Bug } from "lucide-react";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  const links = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: "/dashboard", label: "Dashboard" },
    { id: 3, href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="flex items-center gap-6 border-b border-gray-800 py-4">
      <Link href="/" className="flex gap-0.5 items-center font-bold">
        <Bug />
        Ticket Tracker
      </Link>

      <ul className="flex items-center gap-4">
        {links.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={`${
                currentPath === item.href ? "text-red-900" : "text-zinc-500"
              } hover:text-zinc-800 transition-colors`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
