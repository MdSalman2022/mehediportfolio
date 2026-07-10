import type {Metadata} from "next";
import {Syne, IBM_Plex_Mono} from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mhsalman.me"),
  title: "Mehedi - Full Stack Web Developer",
  description:
    "Passionate full-stack developer specializing in React, Node.js, and MongoDB. Creating beautiful, functional web experiences with modern technologies.",
  keywords:
    "frontend developer, react developer, full stack developer, MERN stack, web development, portfolio",
  authors: [{name: "Mehedi"}],
  creator: "Mehedi",
  openGraph: {
    title: "Mehedi - Full Stack Web Developer",
    description:
      "Passionate full-stack developer creating beautiful web experiences",
    url: "https://mhsalman.me",
    siteName: "Mehedi Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mehedi - Full Stack Web Developer",
    description:
      "Passionate full-stack developer creating beautiful web experiences",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${ibmPlexMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
