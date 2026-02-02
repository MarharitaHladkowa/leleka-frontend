import type { Metadata } from "next";
import { Comfortaa, Geist, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Лелека",
  description:
    "Зручний застосунок для супроводу вагітності: трекінг розвитку дитини, щоденник мами та корисні поради для батьків на кожен день.", // Больше 100 символов
  openGraph: {
    title: "Leleka Project — Baby Tracking App",
    description:
      "Командний проект: веб-застосунок для майбутніх мам. Функціонал включає щоденник, трекер стану дитини та персоналізовані поради.",
    url: "https://leleka-frontend-rust.vercel.app/",
    images: [
      {
        url: "https://github.com/MarharitaHladkowa/leleka-frontend/blob/main/public/og-image.jpg?raw=true", // Твоя прямая ссылка
        width: 1200,
        height: 630,
        alt: "Leleka App Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <ThemeProvider>
            {children}
            <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
          </ThemeProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
