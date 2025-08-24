import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "A minimalistic, responsive two-player Tic Tac Toe built with Next.js",
  applicationName: "Tic Tac Toe",
  authors: [{ name: "App Generator" }],
  keywords: ["tic tac toe", "game", "next.js", "react"],
  themeColor: "#FFFFFF",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
