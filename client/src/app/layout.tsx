import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarField from "@/components/layout/StarField";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Counsellor | Your Study Abroad North Star",
  description: "Navigate your study abroad journey with precision and clarity. Guided AI counselling for your academic future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StarField />
        <main className="relative z-10 min-height-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
