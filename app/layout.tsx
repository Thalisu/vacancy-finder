import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./lib/fonts";

export const metadata: Metadata = {
  title: "Vacancy Finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-svh w-svw flex flex-col bg-gray-950/95`}
      >
        {children}
      </body>
    </html>
  );
}
