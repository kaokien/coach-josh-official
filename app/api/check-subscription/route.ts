// app/api/check-subscription/route.ts
import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    console.log('🔵 Checking subscription...');
    
    const { userId } = await auth();
    
    if (!userId) {
      console.log('❌ No user ID found');
      return NextResponse.json({ isSubscribed: false, reason: 'not_authenticated' });
    }

    console.log('👤 Clerk User ID:', userId);

    // Method 1: Search for customers with this userId in metadata
    const customers = await stripe.customers.search({
      query: `metadata["userId"]:"${userId}"`,
      limit: 10,
    });

    console.log('🔍 Found customers by userId:', customers.data.length);

    // Method 2: If not found by metadata, try email as fallback
    if (customers.data.length === 0) {
      const user = await currentUser();
      const email = user?.emailAddresses?.[0]?.emailAddress;
      
      if (email) {
        console.log('📧 Trying email fallback:', email);
        const emailCustomers = await stripe.customers.list({
          email: email,
          limit: 10,
        });
        customers.data.push(...emailCustomers.data);
        console.log('🔍 Found customers by email:', emailCustomers.data.length);
      }
    }

    if (customers.data.length === 0) {
      console.log('❌ No Stripe customer found');
      return NextResponse.json({ isSubscribed: false, reason: 'no_customer' });
    }

    // Check all found customers for active subscriptions
    for (const customer of customers.data) {
      console.log('🔍 Checking customer:', customer.id, customer.email);
      
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'active',
        limit: 10,
      });

      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0];
        console.log('✅ Found active subscription:', subscription.id);
        
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
        console.log('✅ Found trialing subscription');
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
    console.log('🔍 Checking recent checkout sessions...');
    const sessions = await stripe.checkout.sessions.list({
      limit: 20,
    });

    for (const session of sessions.data) {
      if (session.metadata?.userId === userId && session.subscription) {
        console.log('🔍 Found checkout session for user:', session.id);
        
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        
        if (subscription.status === 'active' || subscription.status === 'trialing') {
          console.log('✅ Found subscription via checkout session:', subscription.id);
          
          // Update the customer with userId metadata for future lookups
          if (session.customer) {
            await stripe.customers.update(session.customer as string, {
              metadata: { userId: userId }
            });
            console.log('📝 Updated customer metadata with userId');
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

    console.log('❌ No active subscription found');
    return NextResponse.json({ isSubscribed: false, reason: 'no_active_subscription' });

  } catch (error: any) {
    console.error('❌ Error checking subscription:', error.message);
    return NextResponse.json({ 
      isSubscribed: false, 
      error: error.message,
      reason: 'error'
    }, { status: 500 });
  }
}
