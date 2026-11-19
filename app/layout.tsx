import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abhilash24.me"),
  title: "abhilash | builder",
  description: "20 y/o CS student building AI agents and the backends behind them. Open to internships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", ibmPlexMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950">
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-50 h-8 border-b border-white/30 bg-white/45 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)] dark:border-white/5 dark:bg-zinc-950/45 sm:h-12"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-8 border-t border-white/30 bg-white/45 backdrop-blur-md [mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)] dark:border-white/5 dark:bg-zinc-950/45 sm:h-12"
        />
      </body>
    </html>
  );
}
