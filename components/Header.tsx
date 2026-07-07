"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { PRINTERS_DATA } from "@/data/printersData";


export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelection = (productName: string) => {
    setQuery(productName);
    setShowDropdown(false);
    // Standardizes alphanumeric parameters for web routing paths
    const urlSafeName = encodeURIComponent(productName.trim().replace(/\s+/g, "-"));
    router.push(`/download/${urlSafeName}`);
  };

    const openChat = () => {
    if (typeof window !== "undefined" && window.jivo_api) {
      window.jivo_api.open();
    }
  };


  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 font-subheading font-normal">
      {/* Brand Bar */}
      <div className="w-full mx-auto px-8 h-20 flex items-center justify-center gap-6">
        {/* Logo
        <div className="shrink-0 cursor-pointer" onClick={() => router.push("/")}>
          <img src="/logo.png" alt="logo" className="h-15 w-45" />
        </div> */}

        {/* COMBINED SEARCH BAR + ASK BUTTON ROW */}
        <div ref={dropdownRef} className="flex-1 max-w-170 flex items-center gap-4 relative">
          {/* Input Box Wrapper */}
          <div className="relative flex-1 flex items-center border border-gray-400 bg-white px-4 h-11 shadow-sm rounded-sm focus-within:border-gray-600 transition-colors">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length > 0 && setShowDropdown(true)}
              placeholder="Search Driver Guides Enter a printer name..."
              className="w-full pr-10 text-base text-gray-800 placeholder-gray-400 focus:outline-none font-subheading font-normal bg-transparent"
            />
            <Search 
              onClick={() => query.trim() !== "" && handleSelection(query)} 
              className="absolute right-4 text-gray-500 w-5 h-5 cursor-pointer stroke-2 hover:text-black transition-colors" 
            />
          </div>

          {/* Connected Button */}
          <button 
            onClick={openChat}
            className="bg-[#111828] text-white px-7 h-11 text-base font-medium rounded-sm hover:bg-[#2C5EB0] transition-colors font-heading flex items-center justify-center shrink-0"
          >
            Ask Us
          </button>
        </div>
      </div>
    </header>
  );
}