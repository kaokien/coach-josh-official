// app/api/check-subscription/route.ts
import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ isSubscribed: false, reason: 'not_authenticated' });
    }

    // Method 1: Search for customers with this userId in metadata
    const customers = await stripe.customers.search({
      query: `metadata["userId"]:"${userId}"`,
      limit: 10,
    });

    // Method 2: If not found by metadata, try email as fallback
    if (customers.data.length === 0) {
      const user = await currentUser();
      const email = user?.emailAddresses?.[0]?.emailAddress;

      if (email) {
        const emailCustomers = await stripe.customers.list({
          email: email,
          limit: 10,
        });
        customers.data.push(...emailCustomers.data);
      }
    }

    if (customers.data.length === 0) {
      return NextResponse.json({ isSubscribed: false, reason: 'no_customer' });
    }

    // Check all found customers for active subscriptions
    for (const customer of customers.data) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'active',
        limit: 10,
      });

      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0];

        return NextResponse.json({
          isSubscribed: true,
          subscription: {
            id: subscription.id,
            status: subscription.status,
            customerId: customer.id,
          }
        });
      }

      // Also check trialing
      const trialingSubscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'trialing',
        limit: 10,
      });

      if (trialingSubscriptions.data.length > 0) {
        return NextResponse.json({
          isSubscribed: true,
          subscription: {
            id: trialingSubscriptions.data[0].id,
            status: trialingSubscriptions.data[0].status,
          }
        });
      }
    }

    // Method 3: Check recent checkout sessions as last resort
    const sessions = await stripe.checkout.sessions.list({
      limit: 20,
    });

    for (const session of sessions.data) {
      if (session.metadata?.userId === userId && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        if (subscription.status === 'active' || subscription.status === 'trialing') {
          // Update the customer with userId metadata for future lookups
          if (session.customer) {
            await stripe.customers.update(session.customer as string, {
              metadata: { userId: userId }
            });
          }

          return NextResponse.json({
            isSubscribed: true,
            subscription: {
              id: subscription.id,
              status: subscription.status,
            }
          });
        }
      }
    }

    return NextResponse.json({ isSubscribed: false, reason: 'no_active_subscription' });

  } catch (error: unknown) {
    // Log error server-side only, don't expose details to client
    console.error('Subscription check error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({
      isSubscribed: false,
      reason: 'error'
    }, { status: 500 });
  }
}
