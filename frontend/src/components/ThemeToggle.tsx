import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa6';

export default function ThemeToggle() {
   
    const [isDark, setIsDark] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.add("transition-colors", "duration-700", "ease-in-out");

        if(isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    })

  return (
    <button 
        onClick={() => setIsDark(!isDark)}
        className="relative w-12 h-12 flex items-center justify-center rounded-full 
        bg-gray-200 dark:bg-gray-700 text text-yellow-500 dark:text-blue-300
        shadow-md transition-all duration-700 ease-in-out hover:scale-110"
    >
        <span
            className={`absolute text-2xl transform duration-700 ease-in-out
                ${isDark ? "rotate-180 opacity-0" : "rotate-0 opacity-100" 
                }`}
        >
            <FaSun />
        </span>
        <span
            className={`absolute text-2xl transform duration-700 ease-in-out
                ${isDark ? "rotate-0 opacity-100" : "rotate-180 opacity-100" 
                }`}
        >
            <FaMoon />
        </span>
    </button>
  )
}
