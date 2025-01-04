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
        className={`${inter.className} flex min-h-svh w-svw flex-col bg-neutral px-2 text-dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
