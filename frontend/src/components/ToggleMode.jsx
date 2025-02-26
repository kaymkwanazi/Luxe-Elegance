import React from 'react';

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        className="sr-only"
      />
      {/* Toggle Background */}
      <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors"></div>
      {/* Toggle Knob (React-controlled position) */}
      <div
        className={`absolute w-5 h-5 bg-white rounded-full shadow-md left-1 top-1 transition-transform ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </label>
  );
}