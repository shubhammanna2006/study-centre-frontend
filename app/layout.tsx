import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./Providers";
import AuthProvider from "./AuthProvider";

const title = "Study Centre — Learn Today, Lead Tomorrow";
const description =
  "Government-recognized computer training institute offering DCA, ADCA, Tally, MS Office, Programming, Web Development and more. Practical labs, expert faculty and placement assistance.";
const ogImage =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fbf9edd4-f24c-4825-b592-3e8a08984c59/id-preview-c9054546--8142aab0-df43-45c6-8dc4-9711739078b4.lovable.app-1782963315272.png";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Study Centre" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Providers>
            <AuthProvider>
              <Header />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
              <WhatsAppFab />
              <Toaster richColors position="top-right" />
            </AuthProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
