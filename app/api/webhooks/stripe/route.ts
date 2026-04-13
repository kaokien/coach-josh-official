import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    if (!webhookSecret) {
      console.error('Missing STRIPE_WEBHOOK_SECRET');
      return new NextResponse('Webhook setup error', { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle the specific event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const clerkUserId = session.metadata?.clerkUserId;

      if (!clerkUserId) {
        console.error('Missing clerkUserId in session metadata');
        return new NextResponse('Missing metadata', { status: 400 });
      }

      console.log(`Payment confirmed for user ${clerkUserId}. Updating permissions...`);

      // Update the user's metadata in Clerk
      try {
        const client = await clerkClient();
        await client.users.updateUserMetadata(clerkUserId, {
          publicMetadata: {
            hasBlueprintAccess: true,
          },
        });
        console.log(`Successfully granted Blueprint access to user ${clerkUserId}`);
      } catch (clerkError) {
        console.error('Error updating Clerk user metadata:', clerkError);
        return new NextResponse('Error updating permissions', { status: 500 });
      }
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });
  } catch (error: any) {
    console.error('Unexpected webhook error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
