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
        className={`${inter.className} bg-neutral text-dark flex min-h-svh w-svw flex-col px-2 antialiased`}
      >
        <JobDataProvider>{children}</JobDataProvider>
      </body>
    </html>
  );
}
