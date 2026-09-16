import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ANNOUNCEMENT_KEY } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { RevealObserver } from "@/components/motion/RevealObserver";
import "./globals.css";

// Display: Archivo with the width axis for a sturdy, wide setting (PRD §5.2).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: {
    default: "Beyond Bancard | The processor that says yes",
    template: "%s | Beyond Bancard",
  },
  description:
    "Merchant accounts for complex and high-risk industries, and for everyday businesses too. Registered ISO/MSP of Esquire Bank, Merrick Bank and Mission Valley Bank.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0e1b3d",
};

// Runs before paint so a dismissed announcement never flashes on reload.
// Also marks JS as available so scroll reveals may hide content until in view.
const announcementScript = `document.documentElement.classList.add("js");try{if(localStorage.getItem(${JSON.stringify(ANNOUNCEMENT_KEY)}))document.documentElement.dataset.announcement="dismissed"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plex.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: announcementScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#content"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-pill bg-ink-900 px-5 py-3 font-semibold text-on-dark transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <AnnouncementBar />
          <Header />
          <main id="content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <StickyMobileCta />
        </MotionProvider>
        <RevealObserver />
        <LenisProvider />
      </body>
    </html>
  );
}
