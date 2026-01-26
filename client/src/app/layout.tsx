import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BotanicalBackground from "@/components/layout/BotanicalBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Counsellor | Your Academic Arboretum",
  description: "Cultivate your future with precision and care. Guided AI counselling for your study abroad journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <BotanicalBackground />
        <main className="relative z-10 min-height-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
