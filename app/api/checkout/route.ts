import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    // Security: Require authentication for checkout
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    const { priceId, mode, successPath = '' } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}${successPath}?success=true`;
    const cancelUrl = `${baseUrl}${successPath}?canceled=true`;

    const email = user?.emailAddresses?.[0]?.emailAddress;

    // Find or create customer with userId in metadata
    let customer: Stripe.Customer | undefined;

    if (userId) {
      const existingCustomers = await stripe.customers.search({
        query: `metadata["userId"]:"${userId}"`,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else if (email) {
        customer = await stripe.customers.create({
          email: email,
          metadata: {
            userId: userId,
            clerkUserId: userId,
          },
        });
      }
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: mode === 'subscription' ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId || 'guest',
      },
    };

    if (customer) {
      sessionParams.customer = customer.id;
    } else if (email) {
      sessionParams.customer_email = email;
    }

    if (mode === 'subscription') {
      sessionParams.subscription_data = {
        metadata: {
          userId: userId || 'guest',
        },
      };
      sessionParams.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });

  } catch (error: unknown) {
    // Log error server-side only, don't expose details to client
    console.error('Checkout error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
