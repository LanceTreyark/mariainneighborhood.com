import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const stackSans = localFont({
  src: "../public/fonts/StackSansText-VariableFont_wght.ttf",
  variable: "--font-stack-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maria in Neighborhood",
  description: "Crafting digital goods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${stackSans.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
