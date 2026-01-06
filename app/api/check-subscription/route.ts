// app/api/check-subscription/route.ts
import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function GET() {
  try {
    console.log('🔵 Checking subscription...');
    
    // Get the current user from Clerk
    const { userId } = await auth();
    
    if (!userId) {
      console.log('❌ No user ID found');
      return NextResponse.json({ isSubscribed: false, reason: 'not_authenticated' });
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;
    
    console.log('👤 User:', userId);
    console.log('📧 Email:', email);

    if (!email) {
      console.log('❌ No email found for user');
      return NextResponse.json({ isSubscribed: false, reason: 'no_email' });
    }

    // Search for customers with this email
    const customers = await stripe.customers.list({
      email: email,
      limit: 10, // Get multiple in case there are duplicates
    });

    console.log('🔍 Found customers:', customers.data.length);

    if (customers.data.length === 0) {
      console.log('❌ No Stripe customer found for email:', email);
      return NextResponse.json({ isSubscribed: false, reason: 'no_customer' });
    }

    // Check all customers for active subscriptions
    for (const customer of customers.data) {
      console.log('🔍 Checking customer:', customer.id);
      
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'active',
        limit: 10,
      });

      console.log('📋 Active subscriptions:', subscriptions.data.length);

      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0];
        console.log('✅ Found active subscription:', subscription.id);
        console.log('📦 Product:', subscription.items.data[0]?.price?.product);
        
        return NextResponse.json({ 
          isSubscribed: true,
          subscription: {
            id: subscription.id,
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end,
            priceId: subscription.items.data[0]?.price?.id,
          }
        });
      }
    }

    // Also check for subscriptions with 'trialing' status
    for (const customer of customers.data) {
      const trialSubscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'trialing',
        limit: 10,
      });

      if (trialSubscriptions.data.length > 0) {
        console.log('✅ Found trialing subscription');
        return NextResponse.json({ 
          isSubscribed: true,
          subscription: trialSubscriptions.data[0]
        });
      }
    }

    console.log('❌ No active subscription found');
    return NextResponse.json({ isSubscribed: false, reason: 'no_subscription' });

  } catch (error: any) {
    console.error('❌ Error checking subscription:', error.message);
    return NextResponse.json({ 
      isSubscribed: false, 
      error: error.message,
      reason: 'error'
    }, { status: 500 });
  }
}
