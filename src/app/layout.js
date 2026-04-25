import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ClientProviders } from "@/components/providers/ClientProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://voyaj.xyz'),
  title: "Voyaj | The smartest way to plan your next journey",
  description: "Voyaj revolutionizes how you explore the world with AI-powered itineraries, authentic local experiences, and seamless travel modes.",
  keywords: [
    "AI travel planner", 
    "smart itineraries", 
    "travel app", 
    "vacation planning", 
    "trip planner",
    "Instagram travel sync", 
    "reel to reality", 
    "group travel planner", 
    "solo travel guide",
    "best AI travel assistant", 
    "travel itinerary generator", 
    "AI vacation planner",
    "Voyaj", 
    "Voyaj travel"
  ],
  openGraph: {
    title: "Voyaj | Reimagine Travel",
    description: "The smartest way to plan your next journey. AI-powered curation, beautifully crafted itineraries, and flexible travel modes.",
    url: "https://voyaj.xyz",
    siteName: "Voyaj",
    images: [
      {
        url: "/images/hero_travel_bg_1777105564032.png", // Using our beautiful hero image as the social preview
        width: 1200,
        height: 630,
        alt: "Voyaj Travel App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyaj | Reimagine Travel",
    description: "The smartest way to plan your next journey.",
    images: ["/images/hero_travel_bg_1777105564032.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <ClientProviders>
          {children}
          <Analytics />
        </ClientProviders>
      </body>
    </html>
  );
}
