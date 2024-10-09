import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./lib/fonts";
import JobDataProvider from "./provider/JobData.provider";

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
        className={`${inter.className} flex min-h-svh w-svw flex-col bg-gray-950/95 antialiased`}
      >
        <JobDataProvider>
          <main className="mx-2 flex flex-1 flex-col items-center justify-center">
            {children}
          </main>
        </JobDataProvider>
      </body>
    </html>
  );
}
