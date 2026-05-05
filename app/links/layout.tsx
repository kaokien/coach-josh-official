import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Links | Coach Josh Official',
  description: 'All links in one place — training programs, free resources, social media, and community. Find everything from Coach Josh Official here.',
  openGraph: {
    title: 'Coach Josh Official — All Links',
    description: 'Training programs, free resources, social media, and community. Everything from Coach Josh in one place.',
    images: ['/og-image.jpg'],
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
