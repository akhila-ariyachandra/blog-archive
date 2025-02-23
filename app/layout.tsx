import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { PRODUCTION_URL } from "./_lib/constants";
import { cn } from "./_lib/helpers";
import "./globals.css";
import ThemeSwitcher from "./theme-switcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    default: "Akhila Ariyachandra's Blog Archive",
    template: "%s | Akhila Ariyachandra",
  },
  description: "A collection of my older blog posts",
  metadataBase: new URL(PRODUCTION_URL),
  openGraph: {
    title: {
      default: "Akhila Ariyachandra's Blog Archive",
      template: "%s | Akhila Ariyachandra",
    },
    description: "A collection of my older blog posts",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@heshan_1010",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        geistMono.variable,
        geistSans.variable,
        "h-full scroll-smooth",
      )}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "font-content flex h-full flex-col overflow-y-scroll bg-white antialiased dark:bg-zinc-950",
          "scrollbar-thin scrollbar-thumb-green-700 dark:scrollbar-thumb-green-500",
          "transition-colors duration-200 ease-out",
        )}
      >
        <ThemeProvider attribute="class">
          <header className="container flex max-w-4xl flex-row items-center justify-between gap-4 p-3 sm:p-4">
            <nav className="flex flex-row items-center gap-2 sm:gap-3">
              <Link
                href="/"
                className="font-medium text-zinc-700 hover:underline sm:text-lg dark:text-zinc-300"
              >
                Home
              </Link>
            </nav>

            <ThemeSwitcher />
          </header>

          <main className="container max-w-4xl p-3 sm:p-4">{children}</main>

          <footer className="container mt-auto max-w-4xl p-3 text-sm text-zinc-700 sm:p-4 sm:text-base dark:text-zinc-300">
            © {new Date().getFullYear()},{" "}
            <Link
              href="/"
              className="font-medium text-green-700 hover:underline dark:text-green-500"
            >
              archive.akhilaariyachandra.com
            </Link>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
