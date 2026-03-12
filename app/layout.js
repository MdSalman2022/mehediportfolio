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

export const metadata = {
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
    url: "https://yoursite.com",
    siteName: "Mehedi Portfolio",
    images: [
      {
        url: "https://yoursite.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi - Frontend Web Developer",
    description:
      "Passionate full-stack developer creating beautiful web experiences",
    creator: "@yourusername",
    images: ["https://yoursite.com/og-image.jpg"],
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

export default function RootLayout({children}) {
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
