// app/train/page.tsx
import { Suspense } from 'react';
import TrainPage from '@/components/pages/train-page';

export const metadata = {
  title: 'Train In Person | CoachJoshOfficial × Bashta\'s Gym',
  description:
    'Train with Coach Josh at Bashta\'s Martial Arts in Hamden, CT. Group boxing classes, private 1-on-1 sessions, and open sparring. View schedule and book your spot.',
  openGraph: {
    title: 'Train In Person | CoachJoshOfficial × Bashta\'s Gym',
    description:
      'Real coaching at Bashta\'s Martial Arts. Group classes, private sessions, and open sparring in Hamden, CT.',
    images: ['/og-image.jpg'],
  },
  keywords: [
    'boxing training hamden ct',
    'coach josh boxing',
    'bashtas martial arts',
    'boxing classes ct',
    'private boxing lessons',
    '1 on 1 boxing training',
    'boxing gym hamden',
  ],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFFFF]" />}>
      <TrainPage />
    </Suspense>
  );
}
