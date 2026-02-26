import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Tecnoiso - Metrologia, Calibração e Certificação Industrial | Joinville SC",
  description: "Laboratório acreditado INMETRO em Joinville/SC. Calibração, certificação, manutenção e consultoria em metrologia industrial. Solicite um orçamento.",
  keywords: "metrologia, calibração, certificação, INMETRO, qualidade, precisão, laboratório, Joinville, Santa Catarina",
  authors: [{ name: "Tecnoiso - Tecnologia e Soluções Industriais" }],
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  openGraph: {
    title: "Tecnoiso - Metrologia, Calibração e Certificação Industrial",
    description: "Laboratório acreditado INMETRO. Calibração, certificação, manutenção e consultoria em metrologia industrial em Joinville/SC.",
    type: "website",
    url: "https://tecnoiso.com.br",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "pt_BR",
    siteName: "Tecnoiso",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tecnoiso",
    title: "Tecnoiso - Metrologia, Calibração e Certificação Industrial",
    description: "Laboratório acreditado INMETRO. Calibração, certificação e consultoria em metrologia industrial.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}