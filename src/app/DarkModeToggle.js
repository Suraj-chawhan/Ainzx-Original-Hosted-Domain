"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode === "true") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-md text-white bg-gray-800 dark:bg-yellow-400 dark:text-black hover:bg-gray-700"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
