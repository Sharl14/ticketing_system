"use client";
import React from "react";
import Link from "next/link";
import { Bug } from "lucide-react";
import { usePathname } from "next/navigation";
import SignOut from "../auth/sign-out";
const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: "/dashboard", label: "Dashboard" },
    { id: 3, href: "/issues/list", label: "Issues" },
  ];

  return (
    <nav className="flex items-center gap-6 border-b border-gray-800 py-4 justify-between">
      <div className="flex items-center justify-between gap-6">
        <Link href="/" className="flex gap-0.5 items-center font-bold">
          <Bug />
          VA ISSUE
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
      </div>
      <div>
        <SignOut />
      </div>
    </nav>
  );
};

export default Navbar;
