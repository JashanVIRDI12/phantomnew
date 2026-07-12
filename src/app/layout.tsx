import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Teko, Manrope } from "next/font/google";
import "./globals.css";

const teko = Teko({
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

/* Body — Manrope: modern grotesque with more character than Inter,
   crisp at small sizes. */
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/* Labels / kickers now share the Manrope sans (see the --font-mono alias on
   <html> below) — the old monospace read as a wireframe, not a final product. */

const siteUrl = "https://phantomlogisticsinc.com";

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // allow pinch-zoom for accessibility
  viewportFit: "cover", // fills the notch area; handled in CSS with env()
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Phantom Logistics — Freight That Moves Like It Was Never There",
    template: "%s — Phantom Logistics",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Phantom Logistics",
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  description:
    "Phantom Logistics runs 2,400 company trucks across all 48 contiguous states. FTL & LTL freight, dedicated contract fleets, vehicle wraps, 24/7 dispatch, live GPS tracking — 98.7% on-time, door to door.",
  keywords: [
    "trucking",
    "logistics",
    "freight",
    "FTL",
    "LTL",
    "dedicated fleet",
    "fleet wraps",
    "dispatch",
    "warehousing",
    "final-mile delivery",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Phantom Logistics",
    title: "Phantom Logistics — Freight That Moves Like It Was Never There",
    description:
      "2,400 trucks. 48 states. 98.7% on-time. Freight that moves like it was never there.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1592805144716-feeccccef5ac?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Class 8 semi truck running a mountain highway at dusk — Phantom Logistics linehaul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom Logistics — Freight That Moves Like It Was Never There",
    description:
      "2,400 trucks. 48 states. 98.7% on-time. Freight that moves like it was never there.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Phantom Logistics",
  url: siteUrl,
  logo: `${siteUrl}/phantom-logo.png`,
  description:
    "Trucking and logistics company providing FTL & LTL freight, dedicated contract fleets, fleet wraps, 24/7 dispatch, live tracking, warehousing and final-mile delivery across the 48 contiguous states.",
  slogan: "Freight that moves like it was never there.",
  areaServed: "United States",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "dispatch",
    availableLanguage: "English",
  },
  knowsAbout: [
    "Freight transport",
    "Truckload shipping",
    "Dedicated contract carriage",
    "Commercial fleet management",
    "Warehousing",
    "Final-mile delivery",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // suppressHydrationWarning: the inline script below adds .motion-ok
      // before hydration, causing a known but intentional class mismatch.
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${teko.variable} ${manrope.variable} antialiased`}
      // Alias the "mono" label font to the clean sans site-wide.
      style={{ "--font-mono": "var(--font-sans)" } as CSSProperties}
    >
      <body className="grain">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("motion-ok")`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
