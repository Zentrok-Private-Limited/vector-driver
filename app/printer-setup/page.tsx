"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, Printer, Laptop, Monitor, Headphones, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Compiled comprehensive master list of printers matching the database
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

export default function PrinterSetupPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside the container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setActiveIndex(-1);

    if (value.trim().length > 0) {
      const filtered = PRINTERS_DATA.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Limits display view to top 8 items
      setSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSelection = (productName: string) => {
    setInputValue(productName);
    setShowDropdown(false);
    const urlSafeName = encodeURIComponent(productName.trim().replace(/\s+/g, "-"));
    router.push(`/download/${urlSafeName}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        handleSelection(inputValue);
      }
      return;
    }

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
      } else if (inputValue.trim() !== "") {
        handleSelection(inputValue);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div className="min-h-screen bg-white antialiased text-[#333333] font-subheading font-normal text-[15px]">
      
      {/* 1. MAIN GLOBAL PLUG-IN HEADER */}
      <Header />

      {/* 2. SUB-STEPS MULTI-STAGE PROGRESS BAR */}
      <div className="w-full bg-[#FAFAFA] border-b border-gray-200 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center space-x-6 text-[16px]">
          {/* Active Step 1 */}
          <div className="flex items-center space-x-2 text-black font-medium tracking-wide">
            <span className="w-5 h-5 rounded-full bg-black text-white text-[14px] flex items-center justify-center font-bold font-heading">
              1
            </span>
            <span>Identify</span>
          </div>
          
          <ChevronRight className="w-3 h-3 text-gray-400" />

          {/* Inactive Step 2 */}
          <div className="flex items-center space-x-2 text-gray-400 font-medium tracking-wide">
            <span className="w-5 h-5 rounded-full border border-gray-300 text-gray-400 text-[14px] flex items-center justify-center font-medium font-heading">
              2
            </span>
            <span>Download</span>
          </div>

          <ChevronRight className="w-3 h-3 text-gray-400" />

          {/* Inactive Step 3 */}
          <div className="flex items-center space-x-2 text-gray-400 font-medium tracking-wide">
            <span className="w-5 h-5 rounded-full border border-gray-300 text-gray-400 text-[14px] flex items-center justify-center font-medium font-heading">
              3
            </span>
            <span>Install</span>
          </div>
        </div>
      </div>

      {/* 3. WELCOME TITLE BANNER & PRODUCT TOGGLE SELECTION COMPONENT */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-8 gap-4">
          <h1 className="text-[28px] md:text-[32px] font-light text-[#008040] font-heading tracking-wide">
            Welcome to Software and Drivers
          </h1>

          <div className="flex items-center space-x-3">
            <span className="text-[14px] text-gray-700 font-medium">Select a different product type:</span>
            
            <div className="flex items-center space-x-2.5">
              {/* Printer (Active Circle Theme Highlight) */}
              <a href="/printer-setup" className="w-10 h-10 rounded-full bg-[#3A76D2] text-white flex items-center justify-center shadow-sm hover:bg-[#2C5EB0] transition-colors">
                <Printer className="w-4.5 h-4.5" />
              </a>

              {/* Laptop */}
              <a href="/laptop-setup" className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Laptop className="w-4.5 h-4.5" />
              </a>

              {/* Desktop Monitor */}
              <a href="/desktop-setup" className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Monitor className="w-4.5 h-4.5" />
              </a>

              {/* Accessories / Headset */}
              <a href="/audio-setup" className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Headphones className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IDENTIFICATION WORKSPACE SUB-GRID SYSTEM */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-gray-200 pb-16">
          
          {/* Left Block: Search Entry Form */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-[36px] font-light text-black tracking-wide font-subheading">
              Let's identify your printer
            </h2>
            
            <div className="space-y-2">
              <label className="block text-[15px] font-normal text-gray-800">
                Enter your serial number, product number or product name
              </label>
              
              {/* Dropdown Container Context */}
              <div ref={dropdownRef} className="relative max-w-xl">
                <div className="relative flex items-center border border-gray-400 bg-white px-5 h-11 shadow-inner rounded-lg focus-within:border-[#007DBD] transition-colors">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => inputValue.trim().length > 0 && setShowDropdown(true)}
                    placeholder="Example: HP OfficeJet 4630"
                    className="w-full pr-10 text-[16px] text-black placeholder-gray-400 focus:outline-none font-subheading font-normal bg-transparent tracking-wide"
                  />
                  <button 
                    onClick={() => inputValue.trim() !== "" && handleSelection(inputValue)}
                    className="absolute right-4 text-gray-500 hover:text-black transition-colors"
                  >
                    <Search className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>

                {/* DYNAMIC AUTOCOMPLETE FLOATING DROPDOWN PANEL */}
                {showDropdown && suggestions.length > 0 && (
                  <div className="absolute top-[48px] left-0 w-full bg-white border border-gray-200 shadow-2xl rounded-lg overflow-hidden z-50 animate-in fade-in duration-100">
                    <ul className="py-1.5 max-h-[280px] overflow-y-auto">
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
                          <span className="text-[12px] opacity-40">→</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Block: Explanatory Product Label Blueprint */}
          <div className="lg:col-span-5 lg:border-l lg:border-gray-200 lg:pl-10 space-y-4">
            <h3 className="text-[15px] font-medium text-black font-heading">
              Examples of where to find your product name
            </h3>
            
            <div className="relative w-full max-w-xs pt-2">
              <img 
                src="/printer-setup1.avif" 
                alt="HP DeskJet sticker visual reference" 
                className="w-full h-auto object-contain mix-blend-multiply"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. POPULAR GRID DIRECTORY BLOCK SELECTION SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <h2 className="text-[26px] font-normal text-black tracking-wide font-heading">
          Or select your product from popular printers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12 text-[14px]">
          
          {/* Column Group 1 */}
          <div className="space-y-3.5">
            <button onClick={() => handleSelection("HP DeskJet 2300 All-in-One Printer series")} className="text-[#006699] hover:underline font-medium block text-left">
              HP DeskJet 2300 All-in-One Printer series
            </button>
            <button onClick={() => handleSelection("HP LaserJet 1018 Printer")} className="text-[#006699] hover:underline font-medium block text-left">
              HP LaserJet 1018 Printer
            </button>
            <button onClick={() => handleSelection("HP LaserJet P1008 Printer")} className="text-[#006699] hover:underline font-medium block text-left">
              HP LaserJet P1008 Printer
            </button>
          </div>

          {/* Column Group 2 */}
          <div className="space-y-3.5">
            <button onClick={() => handleSelection("HP DeskJet GT 5820 All-in-One Printer series")} className="text-[#006699] hover:underline font-medium block text-left">
              HP DeskJet GT 5820 All-in-One Printer series
            </button>
            <button onClick={() => handleSelection("HP LaserJet P1007 Printer")} className="text-[#006699] hover:underline font-medium block text-left">
              HP LaserJet P1007 Printer
            </button>
            <button onClick={() => handleSelection("HP LaserJet Pro M202 series")} className="text-[#006699] hover:underline font-medium block text-left">
              HP LaserJet Pro M202 series
            </button>
          </div>

          {/* Column Group 3 */}
          <div className="space-y-3.5">
            <button onClick={() => handleSelection("HP Ink Tank 310 series")} className="text-[#006699] hover:underline font-medium block text-left">
              HP Ink Tank 310 series
            </button>
            <button onClick={() => handleSelection("HP Laser 100 Printer series")} className="text-[#006699] hover:underline font-medium block text-left">
              HP Laser 100 Printer series
            </button>
            <button onClick={() => handleSelection("HP Laser MFP 1000 Printer series")} className="text-[#006699] hover:underline font-medium block text-left">
              HP Laser MFP 1000 Printer series
            </button>
          </div>

        </div>
      </section>

      {/* 6. CORNER CHAT CAPSULE TAB SYSTEM */}
      <div className="fixed bottom-0 right-6 z-50">
        <div className="bg-[#3F0E9C] text-white px-5 py-3 rounded-t-md flex items-center space-x-3 cursor-pointer shadow-lg hover:bg-[#310A7A] transition-colors">
          <span className="text-[14px] font-semibold font-heading">Leave a message</span>
          <MessageSquare className="w-4 h-4 fill-white text-[#3F0E9C]" />
        </div>
      </div>

      {/* 7. BOTTOM STICKY GENERAL LEGAL INFRASTRUCTURE STRIP FOOTER */}
      <Footer />

    </div>
  );
}