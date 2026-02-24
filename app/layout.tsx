import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";


export const metadata = {
  title: {
    default: "St. Sebastianus Schützenbruderschaft Büderich von 1567 e.V.",
    template: "%s | Schützenbruderschaft Büderich",
  },
  description:
    "Willkommen bei der St. Sebastianus Schützenbruderschaft Meerbusch-Büderich 1567 e.V. – Tradition, Gemeinschaft und Heimatliebe seit über 450 Jahren.",
  keywords: ["Schützenbruderschaft", "Büderich", "Meerbusch", "Schützenfest", "St. Sebastianus"],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    siteName: "Schützenbruderschaft Büderich",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="de">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
