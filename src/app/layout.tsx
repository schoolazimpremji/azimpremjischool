import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Campus Flora & Biodiversity | Azim Premji School",
  description: "A student-researched botanical field guide documenting plant species across the Azim Premji School campus.",
  keywords: ["Azim Premji School", "Campus Biodiversity", "Flora", "Botanical Field Guide", "Nature Education", "Plants"],
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
