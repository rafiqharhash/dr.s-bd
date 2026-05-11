import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Salma ❤️ — A Special Place Made Just for You",
  description: "A luxury digital experience crafted with love for the most special person. Happy Birthday, Salma! 🎂✨",
  keywords: ["Birthday", "Salma", "Happy Birthday", "Special"],
  authors: [{ name: "Made with love" }],
  openGraph: {
    title: "Happy Birthday Salma ❤️",
    description: "A little corner on the internet made specially for you.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday Salma ❤️",
    description: "A little corner on the internet made specially for you.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#080818" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>❤️</text></svg>" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
