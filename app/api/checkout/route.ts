// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('❌ STRIPE_SECRET_KEY is not set!');
}

const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2024-11-20.acacia', // Use latest stable version
});

export async function POST(req: NextRequest) {
  console.log('🔵 Checkout API called');
  
  try {
    // Check Stripe key
    if (!stripeSecretKey) {
      console.error('❌ Missing STRIPE_SECRET_KEY');
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
      console.log('📦 Request body:', body);
    } catch (e) {
      console.error('❌ Failed to parse request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { priceId, mode, successPath = '' } = body;

    // Validate priceId
    if (!priceId) {
      console.error('❌ Missing priceId');
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    console.log('💰 Price ID:', priceId);
    console.log('📋 Mode:', mode);

    // Get user info from Clerk (optional - works for logged in users)
    let customerEmail: string | undefined;
    let userId: string | undefined;
    
    try {
      const authResult = await auth();
      userId = authResult.userId || undefined;
      
      if (userId) {
        const user = await currentUser();
        customerEmail = user?.emailAddresses?.[0]?.emailAddress;
        console.log('👤 User:', userId, customerEmail);
      }
    } catch (e) {
      console.log('ℹ️ No authenticated user (guest checkout)');
    }

    // Build URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    'http://localhost:3000';
    
    const successUrl = successPath 
      ? `${baseUrl}${successPath}?success=true&session_id={CHECKOUT_SESSION_ID}` 
      : `${baseUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}?canceled=true`;

    console.log('🔗 Success URL:', successUrl);
    console.log('🔗 Cancel URL:', cancelUrl);

    // Verify the price exists in Stripe
    try {
      const price = await stripe.prices.retrieve(priceId);
      console.log('✅ Price found:', price.id, price.unit_amount);
    } catch (e: any) {
      console.error('❌ Invalid price ID:', e.message);
      return NextResponse.json(
        { error: `Invalid price ID: ${priceId}` },
        { status: 400 }
      );
    }

    // Build checkout session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: mode === 'subscription' ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId || 'guest',
      },
    };

    // Add customer email if available
    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    // Subscription-specific options
    if (mode === 'subscription') {
      sessionParams.subscription_data = {
        metadata: {
          userId: userId || 'guest',
        },
      };
      sessionParams.allow_promotion_codes = true;
    }

    console.log('🔧 Creating checkout session...');
    
    // Create the session
    const session = await stripe.checkout.sessions.create(sessionParams);
    
    console.log('✅ Session created:', session.id);
    console.log('🔗 Session URL:', session.url);

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('❌ Checkout error:', error);
    console.error('Error message:', error.message);
    console.error('Error type:', error.type);
    console.error('Error code:', error.code);
    
    // Return more specific error
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
}
