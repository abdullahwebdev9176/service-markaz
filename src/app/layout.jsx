import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/app/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Service Markaz – Find Local Service Providers in Pakistan",
    template: "%s | Service Markaz",
  },
  description:
    "Service Markaz helps you find trusted local service providers — electricians, plumbers, painters and more — across cities in Pakistan.",
  metadataBase: new URL("https://servicemarkaz.com"),
  openGraph: {
    siteName: "Service Markaz",
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
