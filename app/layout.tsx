import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Exe Vouches",
  description: "Pure chill community with daily VCs, giveaways, and nonstop good vibes — no toxicity, just family. EXE is back — louder, richer, and vibing harder than ever.",
  icons: {
    icon: "https://cdn.discordapp.com/attachments/1411591288666456084/1439201034848436326/Extreme_Official.gif",
    shortcut: "https://cdn.discordapp.com/attachments/1411591288666456084/1439201034848436326/Extreme_Official.gif",
    apple: "https://cdn.discordapp.com/attachments/1411591288666456084/1439201034848436326/Extreme_Official.gif",
  },
  openGraph: {
    title: "Exe Vouches",
    description: "Pure chill community with daily VCs, giveaways, and nonstop good vibes — no toxicity, just family.",
    images: [
      {
        url: "https://images-ext-1.discordapp.net/external/MtDdz6yEB-5BuhaCp5cBB9o5r3hTTMsgO5l5ea9_dDg/%3Fsize%3D1024/https/cdn.discordapp.com/banners/449751480375705601/fd2c333bb4b71d1f152ad61f96826a2c.png?format=webp&quality=lossless&width=800&height=428",
        width: 800,
        height: 428,
        alt: "EXE Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exe Vouches",
    description: "Pure chill community with daily VCs, giveaways, and nonstop good vibes — no toxicity, just family.",
    images: ["https://images-ext-1.discordapp.net/external/MtDdz6yEB-5BuhaCp5cBB9o5r3hTTMsgO5l5ea9_dDg/%3Fsize%3D1024/https/cdn.discordapp.com/banners/449751480375705601/fd2c333bb4b71d1f152ad61f96826a2c.png?format=webp&quality=lossless&width=800&height=428"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#0a0a0a] text-white antialiased`}>
        <Header />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
