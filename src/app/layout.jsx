import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "../../@/components/ui/toaster";
import AuthProvider from "../context/AuthProvider";
import { getSession } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    template: "Admin",
    default: "Admin",
  },
  description: "Vlsi Admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      {/* <AuthProvider> */}
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          {typeof window !== "undefined" && <Toaster />}
        </body>
      {/* </AuthProvider> */}
    </html>
  );
}
