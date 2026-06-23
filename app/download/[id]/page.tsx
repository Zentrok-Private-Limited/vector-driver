"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, Download, ShieldCheck, Lock, Phone,CloudDownload } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DownloadPage() {
  const params = useParams();
  const router = useRouter();
  
  // Decodes url strings safely (e.g. "HP-DeskJet-1110" -> "HP DeskJet 1110")
  const printerName = params.id 
    ? decodeURIComponent(params.id as string).replace(/-/g, " ") 
    : "HP Printer Series";

  return (
    <div className="min-h-screen bg-white antialiased text-[#333333] font-subheading font-normal text-[15px]">
      <Header />

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-[15px] text-gray-600 mb-8">
          <button onClick={() => router.push("/printer-setup")} className="hover:underline">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <button onClick={() => router.push("/printer-setup")} className="hover:underline">Drivers</button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-semibold">{printerName}</span>
        </div>

        {/* Main Download Card Workspace Component */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] py-8 md:py-10 space-y-16 relative">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-200 px-8 pb-4">
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 bg-[#F0F4FA] rounded-xl flex items-center justify-center text-[#3A76D2]">
                <CloudDownload className="w-10 h-10 stroke-2" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#3A76D2] rounded-full" />
              </div>
              
              <div className="space-y-1">
                <h2 className="text-[24px] md:text-[28px] font-medium text-[#111111] tracking-tight">
                  {printerName}
                </h2>
                <p className="text-[15px] text-gray-500">
                  Version: <span className="font-medium text-gray-500">24.1.0.103</span>
                  <span className="mx-2 text-gray-300">|</span> 
                  File size: <span className="font-medium text-gray-500">142.5 MB</span>
                </p>
              </div>
            </div>

            <button className="w-full md:w-auto bg-[#007DBD] hover:bg-[#015A8E] hover:cursor-pointer text-white font-medium text-[16px] px-8 py-3.5 rounded-lg flex items-center justify-center space-x-2 shadow-sm transition-colors tracking-wide">
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>Download Now</span>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center max-w-2xl mx-auto space-y-3 pt-6 py-6 text-center">
            <h3 className="text-[20px] font-medium text-[#222222]">
              Software Installation Guide
            </h3>
            <p className="text-gray-500 text-[16px] leading-relaxed max-w-lg">
              Click the download button above to start getting the latest software and drivers for your device. 
              Our automated tool will help you set up everything correctly.
            </p>
          </div>

        </div>

        {/* Bottom Badges */}
        <div className="flex items-center justify-center space-x-8 mt-10 text-[12px] font-semibold tracking-wider text-gray-400 uppercase">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-gray-400 stroke-2" />
            <span>Secure Download</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Lock className="w-4 h-4 text-gray-400 stroke-2" />
            <span>Encrypted Setup</span>
          </div>
        </div>

        {/* Side Call Widgets */}
        <div className="fixed bottom-24 right-6 z-50">
          <button className="w-14 h-14 bg-[#3A76D2] hover:bg-[#2C5EB0] text-white rounded-full flex items-center justify-center shadow-xl transition-all">
            <Phone className="w-6 h-6 fill-white" />
          </button>
        </div>

        <div className="fixed bottom-0 right-12 z-50 w-72">
          <div className="bg-linear-to-r from-[#4E148C] to-[#2575FC] text-white px-4 py-2.5 rounded-t-xl flex items-center justify-between cursor-pointer shadow-2xl">
            <span className="text-[13px] font-medium tracking-wide">We are online</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}