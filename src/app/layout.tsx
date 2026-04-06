import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PWARegistration from "@/components/PWARegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FFE600",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "MMD Entrenamiento | Supera tus límites",
  description: "Sistema oficial de entrenamiento MMD. Animarse te acerca más al éxito.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MMD Training",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-brand/30">
        <PWARegistration />
        {children}
      </body>
    </html>
  );
}

