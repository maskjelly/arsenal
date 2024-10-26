import type { Metadata } from "next";
import { ThemeProvider } from "@/app/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import Banner from "@/components/banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arsenal",
  description: "Realtime - AI Research Engine - Make your research time better ",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
    <meta charSet="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="twitter:card" content="rr.svg"/>
    <meta name="twitter:site" content="@liquidzooo"/>
    <meta name="twitter:title" content="BEANLABS"/>
    <meta name="twitter:description" content="AI CORE answer enginer for RESEARCHERS"/>
    <meta name="twitter:image" content="https://beanlabs.vercel.app/rr.svg"/>
    <meta name="twitter:image:alt" content="AI answer engine for research"/>
    <title>Your Page Title</title>
</head>
      <body className="font-mono">
        <Banner/>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
