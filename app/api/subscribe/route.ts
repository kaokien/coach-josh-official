// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';

const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    // Add to Loops
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source,
        sampler_downloaded: true,
        subscribed: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add contact to Loops');
    }

    // Trigger the welcome sequence
    await fetch('https://app.loops.so/api/v1/events/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        eventName: 'sampler_downloaded',
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
