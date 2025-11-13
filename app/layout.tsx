import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const bigShoulders = localFont({
  src: "../public/fonts/BigShoulders-VariableFont_opsz,wght.ttf",
  variable: "--font-big-shoulders",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${stackSans.variable} ${bigShoulders.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
