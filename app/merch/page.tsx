// app/merch/page.tsx
import MerchShowcase from '@/components/merch-showcase';

export const metadata = {
  title: 'Coach Josh Store | Official Merchandise',
  description: 'Exclusive boxing gear, hoodies, and training programs.',
};

export default function MerchPage() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] pt-24"> 
      {/* pt-24 adds padding to the top so it doesn't hide behind the navbar */}
      <MerchShowcase />
    </main>
  );
}
