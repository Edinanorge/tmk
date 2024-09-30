"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGlobe } from "react-icons/fa";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    router.push(`/${lang}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-center pl-5 md:pt-1">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <FaGlobe className="text-white text-[20px]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white border rounded shadow-lg">
          <div className="py-1">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => changeLanguage("en")}
            >
              English
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => changeLanguage("hu")}
            >
              Magyar
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => changeLanguage("no")}
            >
              Norsk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
