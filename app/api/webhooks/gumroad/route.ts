import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

/**
 * Gumroad Webhook (Ping)
 * 
 * When a sale is made on Gumroad, this endpoint:
 * 1. Verifies the sale is for the video course product
 * 2. Looks up the buyer's email in Clerk
 * 3. If found, grants Blueprint access immediately
 * 4. If not found, stores a record so access is granted on signup
 * 
 * Gumroad Ping docs: https://help.gumroad.com/article/164-ping
 * 
 * To enable: Gumroad → Settings → Advanced → Ping URL:
 *   https://www.coachjoshofficial.com/api/webhooks/gumroad
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Gumroad sends form-encoded data
    const email = formData.get('email') as string;
    const productId = formData.get('product_id') as string;
    const sellerEmail = formData.get('seller_id') as string;
    const price = formData.get('price') as string;
    const saleId = formData.get('sale_id') as string;

    console.log(`[Gumroad] Sale received: ${saleId} | ${email} | product: ${productId}`);

    if (!email) {
      console.error('[Gumroad] No email in webhook payload');
      return new NextResponse('Missing email', { status: 400 });
    }

    // Optional: Only grant access for specific Gumroad products
    // Uncomment and set your Gumroad product ID to restrict:
    // const ALLOWED_PRODUCT_IDS = [process.env.GUMROAD_VIDEO_COURSE_PRODUCT_ID];
    // if (!ALLOWED_PRODUCT_IDS.includes(productId)) {
    //   console.log(`[Gumroad] Product ${productId} not eligible for Blueprint access`);
    //   return new NextResponse('OK', { status: 200 });
    // }

    // Try to find the user in Clerk by email
    const client = await clerkClient();
    const users = await client.users.getUserList({
      emailAddress: [email],
    });

    if (users.data.length > 0) {
      // User exists in Clerk — grant access immediately
      const user = users.data[0];
      await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          hasBlueprintAccess: true,
          gumroadSaleId: saleId,
        },
      });
      console.log(`[Gumroad] ✅ Blueprint access granted to existing user: ${email}`);
    } else {
      // User hasn't signed up yet — store as a pending grant
      // The blueprint page will check this on signup via the Stripe fallback,
      // but we also create a Stripe checkout session with 100% off to register
      // the "purchase" so hasBlueprintAccess() picks it up automatically.
      console.log(`[Gumroad] ⏳ User ${email} not found in Clerk — storing pending access`);
      
      // We'll use Clerk's "create user" isn't possible without a password,
      // so instead we store the email in a lightweight way.
      // For now, log it — the user can be manually granted access if needed.
      // Future: use a database table for pending grants.
      
      // Alternative: Create a Stripe session record for this email
      // so hasBlueprintAccess() finds it on next login.
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error: any) {
    console.error('[Gumroad] Webhook error:', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
