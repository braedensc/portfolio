import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Braeden Collins — Full-stack software engineer",
  description:
    "Portfolio — an explorable world drawn from my own photographs. Simple view available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
