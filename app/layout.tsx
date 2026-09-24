import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import './globals.css';

const notoThai = Noto_Sans_Thai({
  variable: '--font-noto-thai',
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://engma-thailand.chic-horse-1549.chatgpt.site'),
  title: 'Engma Thailand | บริการทรัพยากรบุคคลจีน-ไทย',
  description: 'พันธมิตรบริการทรัพยากรบุคคลครบวงจร สำหรับธุรกิจจีนที่ลงทุนและเติบโตในประเทศไทย',
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://engma-thailand.chic-horse-1549.chatgpt.site',
    siteName: 'Engma Thailand',
    title: 'Engma Thailand | People. Business. Beyond.',
    description: 'พันธมิตรทรัพยากรบุคคลจีน-ไทยครบวงจร',
    images: [{ url: 'https://engma-thailand.chic-horse-1549.chatgpt.site/og.png', width: 1734, height: 907, alt: 'Engma Thailand - People. Business. Beyond.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engma Thailand | People. Business. Beyond.',
    description: 'พันธมิตรทรัพยากรบุคคลจีน-ไทยครบวงจร',
    images: ['https://engma-thailand.chic-horse-1549.chatgpt.site/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body className={notoThai.variable}>{children}</body>
    </html>
  );
}
