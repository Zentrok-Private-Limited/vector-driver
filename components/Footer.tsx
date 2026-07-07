import React from "react";

export default function Footer() {
  const openChat = () => {
    if (typeof window !== "undefined" && window.jivo_api) {
      window.jivo_api.open();
    }
  };

  return (
    <>
      {/* Disclaimer */}
<section className="bg-white px-4 py-12 border-t border-gray-200">
  <div className="max-w-285 mx-auto">
    <div className="relative rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">

      <h3 className="text-2xl font-bold text-gray-900 mb-5">
        Disclaimer
      </h3>

      <div className="space-y-5 text-[15px] leading-7 text-gray-600">
        <p>
          This website provides support and setup assistance for printer
          devices. We are an independent service provider and are not affiliated
          with, endorsed by, or connected to HP Inc. or any printer
          manufacturer. All brand names, trademarks, and logos mentioned on
          this website are the property of their respective owners.
        </p>

        <p>
          The information, drivers, and setup tools provided on this website are
          offered for informational and technical support purposes only. While
          we strive to ensure accuracy and reliability, we make no warranties or
          representations regarding the completeness, accuracy, or suitability
          of any content or software provided.
        </p>

        <p>
          Users are advised to verify compatibility with their specific printer
          models before downloading any drivers or software. We are not
          responsible for any issues that may arise from the use of information
          or tools provided on this website. For official manufacturer support,
          please visit the manufacturer's official website.
        </p>

        <p>
          By using this website and its services, you acknowledge that you have
          read, understood, and agreed to this disclaimer. If you do not agree
          with these terms, please do not use this website or download any
          materials from it.
        </p>
      </div>
       {/* Badge */}
      <div className="inline-flex items-center justify-center rounded-md bg-[#1955B4] px-8 py-2 mt-8">
        <span className="text-sm font-light tracking-[0.25em] text-white uppercase">
          Independent Guidance
        </span>
      </div>
    </div>
    
  </div>
</section>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-8 px-4 text-xs">
        <div className="max-w-285 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
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

            <button
              onClick={openChat}
              className="text-[#1955B4] hover:underline"
            >
              LIVE CHAT
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}