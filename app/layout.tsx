import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saketh Kashyap Nagendra | Software Engineer & Data Science Student",
  description: "Software Engineering Intern at Boeing | Data Science Student at IIT Madras. Passionate about full-stack development, machine learning, and building impactful software solutions.",
  keywords: ["Software Engineer", "Data Science", "Full Stack Developer", "React", "Next.js", "Machine Learning", "TypeScript", "Python", "Boeing", "IIT Madras"],
  authors: [{ name: "Saketh Kashyap Nagendra" }],
  openGraph: {
    title: "Saketh Kashyap Nagendra | Portfolio",
    description: "Software Engineering Intern at Boeing | Data Science Student at IIT Madras",
    type: "website",
    locale: "en_US",
  },
};

// ... unchanged code
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
