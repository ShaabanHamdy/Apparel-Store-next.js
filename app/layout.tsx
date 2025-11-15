import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./(pages)/context/Context";
import Discount from "./(pages)/navbar/Discount";
import Navbar from "./(pages)/navbar/Navbar";
import { cookies } from "next/headers"; // ✅ To detect locale on server if using Next.js i18n

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata — you can translate this dynamically later based on locale
export const metadata: Metadata = {
  title: "SHAABAN",
  description:
    "Explore the latest trends in streetwear and modern fashion. Shop high-quality, affordable clothing for men and women at UrbanThread. New arrivals weekly!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Detect locale (if using Next.js built-in i18n)
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "en";

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"

      >
        <AppProvider>
          {/* ✅ Translatable components */}
          <Discount />
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
