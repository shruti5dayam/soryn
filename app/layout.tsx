import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soryn",
  description:
    "Technology, Intelligence and Finance — educational articles, research and projects by ShrutiD.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {/* Each page's content is rendered here as `children`. */}
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
