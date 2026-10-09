import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Moments | Thoughtful Gifts",
  description:
    "Thoughtfully curated gifts for birthdays, celebrations, thank-yous, and all the little moments that matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
