"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  return (
    <label className="flex items-center cursor-pointer gap-2 select-none">
      <span className="text-sm">{dark ? "Night" : "Day"}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={dark}
          onChange={() => setDark((d) => !d)}
          className="sr-only"
        />
        <div className="block w-12 h-7 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors"></div>
        <div
          className={`absolute top-1 left-1 w-5 h-5 rounded-full transition-transform duration-300 flex items-center justify-center text-yellow-500 bg-white dark:bg-gray-900 shadow-md ${
            dark ? "translate-x-5" : ""
          }`}
        >
          {dark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.635-7.626 6.374-9.093a.75.75 0 01.976.937A7.501 7.501 0 0016.5 16.5a.75.75 0 01.937.976z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.061-1.061M12 7.5A4.5 4.5 0 1112 16.5a4.5 4.5 0 010-9z"
              />
            </svg>
          )}
        </div>
      </div>
    </label>
  );
}
