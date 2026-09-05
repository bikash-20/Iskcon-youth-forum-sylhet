import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Tiro_Devanagari_Sanskrit } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import LenisProvider from "@/components/LenisProvider";
import PageTransition from "@/components/PageTransition";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const deva = Tiro_Devanagari_Sanskrit({
  subsets: ["latin", "devanagari"],
  weight: ["400"],
  variable: "--font-deva",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ISKCON Youth Forum, Sylhet",
  description:
    "The youth wing of ISKCON Sylhet — nourishing young lives through scripture, devotion, kirtan, and practical wisdom at Sri Sri Radha Madhava Mandir.",
};

export const viewport: Viewport = {
  themeColor: "#fdfaf3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${deva.variable}`}
    >
      <body className="grain-page min-h-screen flex flex-col">
        <MotionProvider>
          <LenisProvider>
            <Header />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}