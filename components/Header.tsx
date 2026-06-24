"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

// Compiled comprehensive master list of printers from your data
const PRINTERS_DATA = [
  // HP LaserJet Series
  "HP LaserJet 1010", "HP LaserJet 1012", "HP LaserJet 1015", "HP LaserJet 1018", 
  "HP LaserJet 1020", "HP LaserJet 1022", "HP LaserJet 1100", "HP LaserJet 1150", 
  "HP LaserJet 1160", "HP LaserJet 1200", "HP LaserJet 1300", "HP LaserJet 1320", 
  "HP LaserJet P1005", "HP LaserJet P1006", "HP LaserJet P1007", "HP LaserJet P1008", 
  "HP LaserJet P1102", "HP LaserJet P1108", "HP LaserJet Pro M12a", "HP LaserJet Pro M12w", 
  "HP LaserJet Pro M15a", "HP LaserJet Pro M15w", "HP LaserJet Pro M102a", "HP LaserJet Pro M102w", 
  "HP LaserJet Pro M104a", "HP LaserJet Pro M104w", "HP LaserJet Pro M203dn", "HP LaserJet Pro M203dw", 
  "HP LaserJet Pro M404dn", "HP LaserJet Pro M404dw", "HP LaserJet Pro 4001dn", 
  "HP LaserJet Enterprise M507dn", "HP LaserJet Enterprise M608dn", "HP LaserJet Enterprise M611dn",

  // HP LaserJet MFP Series
  "HP LaserJet M1005 MFP", "HP LaserJet M1120 MFP", "HP LaserJet M1132 MFP", 
  "HP LaserJet M1212nf", "HP LaserJet M1217nfw", "HP LaserJet Pro MFP M125a", 
  "HP LaserJet Pro MFP M125nw", "HP LaserJet Pro MFP M126a", "HP LaserJet Pro MFP M126nw", 
  "HP LaserJet Pro MFP M127fn", "HP LaserJet Pro MFP M128fn", "HP LaserJet Pro MFP M132a", 
  "HP LaserJet Pro MFP M132nw", "HP LaserJet Pro MFP M227fdw", "HP LaserJet Pro MFP M428fdw",

  // HP DeskJet Series
  "HP DeskJet 1112", "HP DeskJet 2131", "HP DeskJet 2132", "HP DeskJet 2331", 
  "HP DeskJet 2332", "HP DeskJet 2621", "HP DeskJet 2723", "HP DeskJet 2729", 
  "HP DeskJet 2776", "HP DeskJet 2810", "HP DeskJet 2820", "HP DeskJet 3630", 
  "HP DeskJet 3636", "HP DeskJet 3835", "HP DeskJet 4123", "HP DeskJet 4155e", 
  "HP DeskJet 4220e", "HP DeskJet 2820e", "HP DeskJet 2855e",

  // HP DeskJet Ink Advantage Series
  "HP Ink Advantage 1115", "HP Ink Advantage 2135", "HP Ink Advantage 2675", 
  "HP Ink Advantage 2778", "HP Ink Advantage 4178", "HP Ink Advantage 4278",

  // HP Smart Tank Series
  "HP Smart Tank 210", "HP Smart Tank 500", "HP Smart Tank 510", "HP Smart Tank 515", 
  "HP Smart Tank 530", "HP Smart Tank 580", "HP Smart Tank 585", "HP Smart Tank 589", 
  "HP Smart Tank 670", "HP Smart Tank 720", "HP Smart Tank 750", "HP Smart Tank 7600", 
  "HP Smart Tank 790", "HP Smart Tank 7001", "HP Smart Tank 7005",

  // HP OfficeJet Series
  "HP OfficeJet 3830", "HP OfficeJet 4650", "HP OfficeJet 5230", "HP OfficeJet 5255", 
  "HP OfficeJet Pro 6960", "HP OfficeJet Pro 6970", "HP OfficeJet Pro 7740", 
  "HP OfficeJet Pro 8010", "HP OfficeJet Pro 8020", "HP OfficeJet Pro 8710", 
  "HP OfficeJet Pro 8720", "HP OfficeJet Pro 9015e", "HP OfficeJet Pro 9025e", 
  "HP OfficeJet Pro 9120",

  // HP ENVY Series
  "HP ENVY 4500", "HP ENVY 4520", "HP ENVY 5055", "HP ENVY 5530", "HP ENVY 5640", 
  "HP ENVY 6020e", "HP ENVY 6055e", "HP ENVY 6420e", "HP ENVY 6455e", 
  "HP ENVY Inspire 7255e", "HP ENVY Inspire 7955e",

  // HP Color LaserJet Series
  "HP Color LaserJet CP1025", "HP Color LaserJet Pro M252dw", "HP Color LaserJet Pro M254dw", 
  "HP Color LaserJet Pro M255dw", "HP Color LaserJet Pro MFP M277dw", "HP Color LaserJet Pro MFP M281fdw", 
  "HP Color LaserJet Pro 3201dw", "HP Color LaserJet Pro 4201dw",

  // HP DesignJet Series
  "HP DesignJet T230", "HP DesignJet T250", "HP DesignJet T630", "HP DesignJet T650", 
  "HP DesignJet T830", "HP DesignJet T850", "HP DesignJet T1600", "HP DesignJet Z6", 
  "HP DesignJet Z9+"
];

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside the component container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter dynamic results list when typing occurs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);

    if (value.trim().length > 0) {
      const filtered = PRINTERS_DATA.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Limits UI display view to top 8 entries for scannability
      setSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSelection = (productName: string) => {
    setQuery(productName);
    setShowDropdown(false);
    // Standardizes alphanumeric parameters for web routing paths
    const urlSafeName = encodeURIComponent(productName.trim().replace(/\s+/g, "-"));
    router.push(`/download/${urlSafeName}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelection(suggestions[activeIndex]);
      } else if (query.trim() !== "") {
        handleSelection(query);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 font-subheading font-normal">
      {/* Brand Bar */}
      <div className="w-full mx-auto px-8 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="shrink-0 cursor-pointer" onClick={() => router.push("/")}>
          <img src="/logo.png" alt="logo" className="h-12 w-12" />
        </div>

        {/* COMBINED SEARCH BAR + ASK BUTTON ROW */}
        <div ref={dropdownRef} className="flex-1 max-w-170 flex items-center gap-4 relative">
          {/* Input Box Wrapper */}
          <div className="relative flex-1 flex items-center border border-gray-400 bg-white px-4 h-11 shadow-sm rounded-sm focus-within:border-gray-600 transition-colors">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => query.trim().length > 0 && setShowDropdown(true)}
              placeholder="Search Driver Guides (e.g. LaserJet, Pavilion)"
              className="w-full pr-10 text-base text-gray-800 placeholder-gray-400 focus:outline-none font-subheading font-normal bg-transparent"
            />
            <Search 
              onClick={() => query.trim() !== "" && handleSelection(query)} 
              className="absolute right-4 text-gray-500 w-5 h-5 cursor-pointer stroke-2 hover:text-black transition-colors" 
            />
          </div>

          {/* Connected Button */}
          <button 
            onClick={() => query.trim() !== "" && handleSelection(query)}
            className="bg-[#111828] text-white px-7 h-11 text-base font-medium rounded-sm hover:bg-[#2C5EB0] transition-colors font-heading flex items-center justify-center shrink-0"
          >
            Ask Us
          </button>

          {/* DYNAMIC AUTOCOMPLETE FLOATING SEARCH BOX */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-11.5 left-0 w-full max-w-134 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-50 animate-in fade-in duration-100">
              <ul className="py-1.5 max-h-80 overflow-y-auto">
                {suggestions.map((item, index) => (
                  <li
                    key={item}
                    onClick={() => handleSelection(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`px-5 py-3 text-[15px] cursor-pointer flex items-center justify-between transition-colors ${
                      index === activeIndex 
                        ? "bg-gray-100 text-blue-600 font-medium" 
                        : "text-gray-700"
                    }`}
                  >
                    <span>{item}</span>
                    <ArrowRight className="text-[8px] opacity-40 font-mono text-blue-600"/>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}