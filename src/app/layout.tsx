import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Furia Chat IA",
  description: "Chat IA oficial da Furia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
