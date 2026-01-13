import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // ConvertKit API Configuration
    const API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY;
    const FORM_ID = process.env.CONVERTKIT_FORM_ID;
    const API_URL = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`;

    // Send data to ConvertKit
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: API_KEY,
        email: email,
        // tags: [12345], // Optional: Add tag IDs if you want
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to subscribe');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('ConvertKit Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
