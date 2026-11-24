import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Tiro_Devanagari_Sanskrit } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import LenisProvider from "@/components/LenisProvider";
import PageTransition from "@/components/PageTransition";
import { OrganizationSchema } from "@/components/JsonLd";
import { SITE_URL, PRIMARY_KEYWORDS } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "ISKCON Youth Forum Sylhet | IYF Sylhet · Sri Sri Radha Madhava Mandir",
    template: "%s | ISKCON Youth Forum Sylhet (IYF Sylhet)",
  },
  description:
    "Official website of ISKCON Youth Forum Sylhet (IYF Sylhet) at Sri Sri Radha Madhava Mandir (Sylhet ISKCON Mondir), Jugaltila. Daily darshan timings, aarti schedule, youth programs, Gita classes, kirtan, and festivals.",
  keywords: PRIMARY_KEYWORDS,
  authors: [
    { name: "ISKCON Youth Forum Sylhet", url: SITE_URL },
    { name: "Devarshi Srivas Dasa" },
  ],
  creator: "ISKCON Youth Forum Sylhet (IYF Sylhet)",
  publisher: "ISKCON Sylhet · Sri Sri Radha Madhava Mandir",
  applicationName: "IYF Sylhet",
  category: "Religion & Spirituality / Youth Organization",
  classification:
    "Hindu Temple, Youth Organization, Spiritual Center, Vedic Culture",
  alternates: {
    canonical: "/",
    languages: {
      "en-BD": "/",
      "bn-BD": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ISKCON Youth Forum Sylhet (IYF Sylhet)",
    title:
      "ISKCON Youth Forum Sylhet | IYF Sylhet · Sri Sri Radha Madhava Mandir",
    description:
      "The youth wing of ISKCON Sylhet at Sri Sri Radha Madhava Mandir (Sylhet ISKCON Mondir), Jugaltila. Nourishing young lives through scripture, devotion, kirtan, and practical Vedic wisdom.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ISKCON Youth Forum Sylhet - Sri Sri Radha Madhava Mandir Jugaltila",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ISKCON Youth Forum Sylhet | IYF Sylhet · Sri Sri Radha Madhava Mandir",
    description:
      "Official portal for ISKCON Youth Forum Sylhet (IYF Sylhet). Daily darshan timings, arati schedule, Gita classes, and youth empowerment in Sylhet.",
    images: ["/opengraph-image"],
    creator: "@iyfsyl",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "BD-55",
    "geo.placename": "Sylhet, Bangladesh",
    "geo.position": "24.8996;91.8540",
    ICBM: "24.8996, 91.8540",
  },
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
      <head>
        <OrganizationSchema />
      </head>
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
