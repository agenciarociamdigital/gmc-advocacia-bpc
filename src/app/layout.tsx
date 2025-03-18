import type { Metadata } from "next";
import { Inter } from "@next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GMS Advocacia - Especialistas em Direito Previdenciário",
  description: "Especialistas em BPC LOAS e Direito Previdenciário",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <WhatsAppButton floating={true} />
      </body>
    </html>
  );
}