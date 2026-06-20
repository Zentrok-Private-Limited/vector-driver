import React from "react";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 font-subheading font-normal">
      {/* Brand Bar */}
      <div className="w-full border mx-auto px-8 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="/logo.png" alt="logo" className="h-12 w-12" />
        </div>

        {/* COMBINED SEARCH BAR + ASK BUTTON ROW */}
        <div className="flex-1 max-w-[680px] flex items-center gap-4">
          {/* Input Box Wrapper */}
          <div className="relative flex-1 flex items-center border border-gray-400 bg-white px-4 h-11 shadow-sm">
            <input
              type="text"
              placeholder="Search Driver Guides (e.g. LaserJet, Pavilion)"
              className="w-full pr-10 text-base text-gray-800 placeholder-gray-400 focus:outline-none font-subheading font-normal bg-transparent"
            />
            <Search className="absolute right-4 text-gray-500 w-5 h-5 cursor-pointer stroke-[2]" />
          </div>

          {/* Connected Button */}
          <button className="bg-black text-white px-7 h-11 text-base font-medium rounded-r-sm hover:bg-gray-800 transition-colors font-heading flex items-center justify-center border border-black flex-shrink-0">
            Ask Us
          </button>
        </div>
      </div>

      {/* Sub-navigation Menu Strip */}
      <div className="w-full bg-black text-white text-sm font-medium tracking-wide font-subheading">
        <div className="max-w-300 mx-auto px-4 h-13 flex items-center justify-center space-x-12">
          <a href="/software-drivers" className="hover:underline">
            Software & Drivers
          </a>
          <a href="printer-support" className="hover:underline">
            Printer Support
          </a>
          <a href="computer-support" className="hover:underline">
            Computer Support
          </a>
        </div>
      </div>
    </header>
  );
}