import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mehedi - Full Stack Web Developer",
  description:
    "Passionate full-stack developer specializing in React, Node.js, and MongoDB. Creating beautiful, functional web experiences with modern technologies.",
  keywords:
    "frontend developer, react developer, full stack developer, MERN stack, web development, portfolio",
  authors: [{ name: "Mehedi" }],
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
