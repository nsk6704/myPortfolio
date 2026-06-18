import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { KonamiEasterEgg } from "@/components/konami-easter-egg";
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
  metadataBase: new URL("https://sakethkashyap.dev"),

  title: {
    default: "Saketh Kashyap Nagendra | Full-Stack & AI Developer",
    template: "%s | Saketh Kashyap Nagendra",
  },

  description:
    "Saketh Kashyap Nagendra is a Full-Stack, Mobile and AI Developer building scalable applications and intelligent systems.",

  keywords: [
    "Saketh Kashyap Nagendra",
    "Software Engineer",
    "Full Stack Developer",
    "Mobile Developer",
    "Machine Learning",
    "React",
    "Next.js",
    "React Native",
    "Python",
    "TypeScript",
    "PyTorch",
    "Django",
    "FastAPI",
    "RV College of Engineering",
  ],

  authors: [{ name: "Saketh Kashyap Nagendra" }],
  creator: "Saketh Kashyap Nagendra",
  publisher: "Saketh Kashyap Nagendra",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Saketh Kashyap Nagendra",
    description:
      "Software Development Engineer | Full-Stack & AI Developer",
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
    description:
      "Software Development Engineer | Full-Stack & AI Developer",
    creator: "@saketh_kashyap",
    images: ["https://sakethkashyap.dev/profile.jpg"],
  },

  icons: {
    icon: "/profile.jpg",
    shortcut: "/profile.jpg",
    apple: "/profile.jpg",
  },
};

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="min-h-screen pt-14 md:pt-16">{children}</main>
          <Toaster />
          <Analytics />
          <KonamiEasterEgg />
        </ThemeProvider>
      </body>
    </html>
  );
}
