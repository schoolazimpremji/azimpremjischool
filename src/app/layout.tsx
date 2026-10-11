import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Campus Biodiversity (Flora & Fauna) | Azim Premji School",
  description: "A student-researched living field journal documenting botanical flora and wildlife fauna across the Azim Premji School campus.",
  keywords: ["Azim Premji School", "Campus Biodiversity", "Flora", "Fauna", "Wildlife", "Botanical Field Guide", "Nature Education", "Birds", "Plants"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-parchment-texture text-forest-950">
        <AuthProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
