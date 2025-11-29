import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Image from 'next/image';

const atkinsonHyperlegible = localFont({
  src: [
    {
      path: '../assets/fonts/AtkinsonHyperlegible-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AtkinsonHyperlegible-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AtkinsonHyperlegible-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/AtkinsonHyperlegible-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-atkinson-hyperlegible',
  display: 'swap',
});

// SEO Configuration - Edit these values as needed
const siteConfig = {
  title: 'indies.cl - Comunidad de Desarrolladores Independientes',
  description:
    'Únete a la comunidad de desarrolladores independientes más activa de Chile. Conecta, colabora y crece junto a otros indies en tecnología.',
  keywords:
    'desarrolladores independientes, comunidad tech, chile, programación, startups, freelancers, networking',
  url: 'https://indies.cl',
  image: '/gatito-indies.webp',
  author: 'Comunidad Indies.cl',
};

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,

  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: 'Indies.cl - Comunidad de Desarrolladores Independientes',
      },
    ],
    siteName: 'indies.cl',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.image],
    creator: '@indiesclchile',
  },

  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification tags (add when available)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark ${atkinsonHyperlegible.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/gatito-indies.ico" />
      </head>
      <body className="bg-background text-foreground relative">
        <div className="absolute top-0 z-[-2] mx-auto h-[70dvh] w-full">
          <Image
            width={0}
            height={0}
            className="h-full w-full object-cover"
            src="/bitmap-xl-svgo.svg"
            alt="Background Bitmap"
          />
        </div>
        <main className="relative">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
