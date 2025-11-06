import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Modak StoryTime - Educational Tales That Teach Life Lessons",
  description: "Discover magical educational stories for children ages 3-12. Interactive tales with moral lessons, reading activities, spelling games, and comprehension questions. Safe, fun learning!",
  keywords: "modak storytime, educational stories for children, moral lessons kids, interactive reading activities, children's books online, bedtime stories with lessons",
  metadataBase: new URL('https://modakstorytime.com'),
  openGraph: {
    title: 'Modak StoryTime',
    description: 'Magical educational stories for kids with games and questions',
    url: 'https://modakstorytime.com',
    siteName: 'Modak StoryTime',
    images: [
      {
        url: 'https://res.cloudinary.com/dogmybs69/image/upload/v1758792316/file_00000000feec61fb932a2d919ac68153_1_pvsahw.png',
        width: 1200,
        height: 630,
        alt: 'Modak StoryTime - Educational Stories for Kids',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modak StoryTime',
    description: 'Magical educational stories for kids with games and questions',
    images: ['https://res.cloudinary.com/dogmybs69/image/upload/v1758792316/file_00000000feec61fb932a2d919ac68153_1_pvsahw.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-soft`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
