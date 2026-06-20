import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-8 px-4 text-xs">
      <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/logo.png" alt="logo" className="h-6 w-6" />
          </div>
          <span className="text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} HP OFFICIAL SUPPORT
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 font-semibold tracking-wide">
          <a href="software-drivers" className="hover:underline">
            SOFTWARE & DRIVERS
          </a>
          <a href="printer-support" className="hover:underline">
            PRINTER SUPPORT
          </a>
          <a href="computer-support" className="hover:underline">
            COMPUTER SUPPORT
          </a>
          <a href="#" className="text-[#1955B4] hover:underline">
            LIVE CHAT
          </a>
        </div>
      </div>
    </footer>
  );
}
