'use client';

import { useState } from 'react';
import { verifyBypassKey } from './actions';
import { Button } from '@/components/ui/button';
import { Loader2, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BypassPage() {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await verifyBypassKey(null, new FormData(e.target as HTMLFormElement));
      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
        router.push('/');
      }
    } catch (e) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] p-4">
      <div className="w-full max-w-md bg-white border-4 border-[#0F172A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center mb-4">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="font-display text-2xl uppercase text-center">Admin Access</h1>
          <p className="font-body text-[#0F172A]/60 text-center mt-2">
            Enter the secure key to bypass the waitlist.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="key" className="sr-only">Access Key</label>
            <input
              id="key"
              name="key"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter Access Key"
              required
              className="w-full border-2 border-[#0F172A] px-4 py-3 font-body text-lg focus:outline-none focus:border-[#2563EB] transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 p-3 text-sm font-bold text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-6 text-lg"
            isLoading={loading}
          >
            {loading ? 'Verifying...' : 'Unlock Access'}
          </Button>
        </form>
      </div>
    </div>
  );
}
