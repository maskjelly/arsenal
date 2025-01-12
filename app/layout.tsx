import type { Metadata } from "next";
// import { Droplert } from '../components/Droplert'
import { ThemeProvider } from "@/app/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import Banner from "@/components/banner";
import { Analytics } from "@vercel/analytics/react";
import Droplert from "@/components/droplert/droplert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arsenal",
  description: "Realtime - AI Research Engine - Make your research time better",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@liquidzooo" />
        <meta name="twitter:title" content="ResearchRelay" />
        <meta
          name="twitter:description"
          content="AI CORE answer enginer for RESEARCHERS"
        />
        <meta
          name="twitter:image"
          content="https://beanlabs.vercel.app/rr.svg"
        />
        <meta
          name="twitter:image:alt"
          content="AI answer engine for research"
        />
        <meta name="twitter:url" content="https://beanlabs.vercel.app" />
        <title>ResearchRelay</title>
      </head>
      <body className="font-mono">
        <Banner />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Analytics />
          {children}
          <Droplert/>
        </ThemeProvider>
      </body>
    </html>
  );
}
