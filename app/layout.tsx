import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import type { Metadata } from "next";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: "HP Official Support",
  description: "HP Official Support",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <Script
         async src="https://www.googletagmanager.com/gtag/js?id=AW-16526856628"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16526856628');
          `}
        </Script>
         <Script
          src="//code.jivosite.com/widget/XTs1LY3ZMo"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
        </body>
    </html>
  );
}