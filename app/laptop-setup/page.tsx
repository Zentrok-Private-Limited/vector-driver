"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronRight,
  Printer,
  Laptop,
  Monitor,
  Headphones,
  MessageSquare,
  Scan,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LaptopSetupPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      // Replaces spaces with dashes cleanly for clean web URLs
      const urlSafeName = encodeURIComponent(inputValue.trim().replace(/\s+/g, "-"));
      router.push(`/download/${urlSafeName}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePopularClick = (name: string) => {
    const urlSafeName = encodeURIComponent(name.trim().replace(/\s+/g, "-"));
    router.push(`/download/${urlSafeName}`);
  };

  return (
    <div className="min-h-screen bg-white antialiased text-[#333333] font-subheading font-normal text-[15px]">
      {/* 1. TOP HEADER COMPONENT */}
      <Header />

      {/* 2. SUB-STEPS MULTI-STAGE PROGRESS BAR */}
      <div className="w-full bg-[#FAFAFA] border-b border-gray-200 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center space-x-6 text-[14px]">
          {/* Active Step 1 */}
          <div className="flex items-center space-x-2 text-black font-semibold">
            <span className="w-5 h-5 rounded-full bg-black text-white text-[11px] flex items-center justify-center font-bold font-heading">
              1
            </span>
            <span>Identify</span>
          </div>

          <ChevronRight className="w-3 h-3 text-gray-400" />

          {/* Inactive Step 2 */}
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="w-5 h-5 rounded-full border border-gray-300 text-gray-400 text-[11px] flex items-center justify-center font-medium font-heading">
              2
            </span>
            <span>Download</span>
          </div>

          <ChevronRight className="w-3 h-3 text-gray-400" />

          {/* Inactive Step 3 */}
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="w-5 h-5 rounded-full border border-gray-300 text-gray-400 text-[11px] flex items-center justify-center font-medium font-heading">
              3
            </span>
            <span>Install</span>
          </div>
        </div>
      </div>

      {/* 3. WELCOME TITLE BANNER & PRODUCT TOGGLE SELECTION COMPONENT */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-8 gap-4">
          <h1 className="text-[28px] md:text-[32px] font-normal text-[#008040] font-heading tracking-wide">
            Welcome to Software and Drivers
          </h1>

          <div className="flex items-center space-x-3">
            <span className="text-[14px] text-gray-700 font-medium">
              Select a different product type:
            </span>

            <div className="flex items-center space-x-2.5">
              {/* Printer */}
              <a
                href="/printer-setup"
                className="w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Printer className="w-4.5 h-4.5" />
              </a>

              {/* Laptop (Active Circle Theme Highlight) */}
              <a
                href="/laptop-setup"
                className="w-10 h-10 rounded-full border border-gray-200 bg-[#3A76D2] text-white flex items-center justify-center"
              >
                <Laptop className="w-4.5 h-4.5" />
              </a>

              {/* Desktop Monitor */}
              <a
                href="/desktop-setup"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Monitor className="w-4.5 h-4.5" />
              </a>

              {/* Accessories / Headset */}
              <a
                href="/audio-setup"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
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
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-[34px] font-normal text-black tracking-wide font-heading">
              Let's identify your laptop
            </h2>

            <div className="space-y-3">
              <label className="block text-[15px] font-normal text-gray-800">
                Enter your serial number, product number or product name
              </label>

              <div className="relative max-w-xl">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Example: HP Pavilion 15"
                  className="w-full bg-white border border-gray-400 rounded-lg pl-5 pr-12 h-11 text-[16px] text-black tracking-wide focus:outline-none focus:border-gray-600 placeholder-gray-400"
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-4 top-3 text-gray-500 hover:text-black transition-colors"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Interactive Scanner Helper Link Option */}
            <div className="pt-2">
              <button
                onClick={() => handlePopularClick("HP Laptop Detected")}
                className="inline-flex items-center space-x-2 text-[#006699] font-medium hover:underline text-[14px]"
              >
                <Scan className="w-4 h-4 text-[#3A76D2]" />
                <span>Find your laptop model</span>
              </button>
            </div>
          </div>

          {/* Right Block: Explanatory Keyboard Shortcut Visual Guide Component */}
          <div className="lg:col-span-5 lg:border-l lg:border-gray-200 lg:pl-10 space-y-4">
            <h3 className="text-[15px] font-medium text-black font-heading">
              Examples of where to find your product name
            </h3>

            <div className="bg-white p-4 space-y-3 max-w-xs">
              <img src="/laptop-setup1.png" alt="Laptop Label Location Specimen" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. POPULAR GRID DIRECTORY BLOCK SELECTION SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <h2 className="text-[26px] font-normal text-black tracking-wide font-heading">
          Or select your product from popular laptops
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12 text-[14px]">
          {/* Column Group 1 */}
          <div className="space-y-3.5">
            <button
              onClick={() => handlePopularClick("HP Pavilion 15 Laptop PC")}
              className="text-[#006699] hover:underline font-medium block text-left"
            >
              HP Pavilion 15 Laptop PC
            </button>
            <button
              onClick={() => handlePopularClick("HP ENVY x360 Laptop")}
              className="text-[#006699] hover:underline font-medium block text-left"
            >
              HP ENVY x360 Laptop
            </button>
            <button
              onClick={() => handlePopularClick("HP ProBook 450 series")}
              className="text-[#006699] hover:underline font-medium block text-left"
            >
              HP ProBook 450 series
            </button>
          </div>

          {/* Column Group 2 */}
          <div className="space-y-3.5">
            <button
              onClick={() => handlePopularClick("HP Pavilion x360 Convertible")}
              className="text-[#006699] hover:underline font-medium block text-left"
            >
              HP Pavilion x360 Convertible
            </button>
            <button
              onClick={() => handlePopularClick("HP Spectre x360 Laptop")}
              className="text-[#006699] hover:underline font-medium block text-left"
            >
              HP Spectre x360 Laptop
            </button>
            <button
              onClick={() => handlePopularClick("HP Victus Gaming Laptop")}
              className="text-[#006699] hover:underline font-medium block text-left"
            >
              HP Victus Gaming Laptop
            </button>
          </div>

          {/* Column Group 3 */}
          <div className="space-y-3.5">
            <button
              onClick={() => handlePopularClick("HP Laptop 15s series")}
              className="text-[#006699] hover:underline font-medium block text-left"
            >
              HP Laptop 15s series
            </button>
            <button
              onClick={() => handlePopularClick("HP EliteBook 840 series")}
              className="text-[#006699] hover:underline font-medium block text-left"
            >
              HP EliteBook 840 series
            </button>
            <button
              onClick={() => handlePopularClick("HP OMEN Gaming Laptop")}
              className="text-[#006699] hover:underline font-medium block text-left"
            >
              HP OMEN Gaming Laptop
            </button>
          </div>
        </div>
      </section>

      {/* 6. CORNER CHAT CAPSULE TAB SYSTEM */}
      <div className="fixed bottom-0 right-6 z-50">
        <div className="bg-[#3F0E9C] text-white px-5 py-3 rounded-t-md flex items-center space-x-3 cursor-pointer shadow-lg hover:bg-[#310A7A] transition-colors">
          <span className="text-[14px] font-semibold font-heading">
            Leave a message
          </span>
          <MessageSquare className="w-4 h-4 fill-white text-[#3F0E9C]" />
        </div>
      </div>

      {/* 7. BOTTOM STICKY GENERAL LEGAL INFRASTRUCTURE STRIP FOOTER */}
      <Footer />
    </div>
  );
}