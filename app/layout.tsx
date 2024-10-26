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
