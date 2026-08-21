import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar"; // Make sure the capital B matches your file name!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kasun Bandara | Software Engineer",
  description: "Portfolio of Kasun Bandara, Software Engineering Student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (_) {}
              })();
            `
          }}
        />
      </head>
      <body className={inter.className}>
        {/* You must put the NavBar component here so it renders on every page! */}
        <NavBar />
        
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}