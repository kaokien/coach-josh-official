import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/lemonsqueezy';

/**
 * Lemon Squeezy Webhook Handler
 *
 * Point your LS webhook to: https://yourdomain.com/api/webhooks/lemonsqueezy
 * Events to enable: order_created
 *
 * Currently logs events for monitoring. Access gating is handled by
 * querying the LS orders API directly (see lib/lemonsqueezy.ts).
 * If you add Supabase later, store purchase records here.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') ?? '';

    // Verify authenticity
    const isValid = await verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error('[LS Webhook] Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const eventName: string = event.meta?.event_name ?? 'unknown';

    console.log(`[LS Webhook] Received: ${eventName}`);

    switch (eventName) {
      case 'order_created': {
        const clerkId = event.meta?.custom_data?.clerk_id;
        const email = event.data?.attributes?.user_email;
        const orderId = event.data?.id;
        const status = event.data?.attributes?.status;

        console.log('[LS Webhook] Order created:', {
          orderId,
          clerkId,
          email,
          status,
        });

        // Future: store in Supabase purchases table
        // await supabase.from('purchases').insert({
        //   clerk_id: clerkId,
        //   email,
        //   ls_order_id: orderId,
        //   product_id: 794615,
        //   status,
        //   created_at: new Date().toISOString(),
        // });

        break;
      }

      default:
        console.log(`[LS Webhook] Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[LS Webhook] Error:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
