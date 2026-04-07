import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevFun",
  description: "Agence digitale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
