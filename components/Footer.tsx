import React from "react";

export default function Footer() {

   const openChat = () => {
    if (typeof window !== "undefined" && window.jivo_api) {
      window.jivo_api.open();
    }
  };

  return (
    <footer className="w-full bg-black text-white py-8 px-4 text-xs">
      <div className="max-w-285 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="shrink-0">
            <img src="/logo.png" alt="logo" className="h-15 w-45" />
          </div>
          <span className="text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} PRINTER ASSISTANCE
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
          <button onClick={openChat} className="text-[#1955B4] hover:underline">
            LIVE CHAT
          </button>
        </div>
      </div>
    </footer>
  );
}
