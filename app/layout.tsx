import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: "https://sakethkashyap.dev",
  title: {
    default: "Saketh Kashyap Nagendra",
    template: "%s | Saketh Kashyap Nagendra",
  },
  description: "Software Development Engineer for Ruaa Ventures | BE CSE @ RVCE ",
  keywords: [
    "Saketh Kashyap Nagendra",
    "Engineer",
    "Software Development Engineer",
    "Full Stack Developer",
    "Data Science",
    "Machine Learning",
    "Frontend Developer",
    "Backend Developer",
    "React",
    "Next.js",
    "React Native",
    "Python",
    "TypeScript",
    "PyTorch",
    "Django",
    "FastAPI",
    "RV College of Engineering",
    "IIT Madras",
    "Bengaluru",
  ],
  authors: [{ name: "Saketh Kashyap Nagendra" }],
  creator: "Saketh Kashyap Nagendra",
  publisher: "Saketh Kashyap Nagendra",
  alternates: {
    canonical: "https://sakethkashyap.dev",
  },
  openGraph: {
    title: "Saketh Kashyap Nagendra",
    description: "Software Development Engineer for Ruaa Ventures | BE CSE @ RVCE ",
    url: "https://sakethkashyap.dev",
    siteName: "Saketh Kashyap Nagendra",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://sakethkashyap.dev/profile.jpg",
        width: 400,
        height: 400,
        alt: "Saketh Kashyap Nagendra",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Saketh Kashyap Nagendra",
    description: "Software Development Engineer for Ruaa Ventures | BE CSE @ RVCE ",
    creator: "@saketh_kashyap",
    images: ["https://sakethkashyap.dev/profile.jpg"],
  },
  icons: {
    icon: "/profile.jpg",
    shortcut: "/profile.jpg",
    apple: "/profile.jpg",
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
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
