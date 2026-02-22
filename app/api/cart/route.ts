import { NextRequest, NextResponse } from "next/server";
import { getCart, createCart, addToCart } from "lib/shopify";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const merchandiseId: string | undefined = body?.merchandiseId;

  if (!merchandiseId) {
    return NextResponse.json({ error: "merchandiseId required" }, { status: 400 });
  }

  let cart = await getCart();

  if (!cart) {
    cart = await createCart();
    // persist the cart id as a cookie so subsequent calls use the same cart
    try {
      (await cookies()).set("cartId", cart.id!);
    } catch (e) {
      // noop
    }
  }

  await addToCart([{ merchandiseId, quantity: 1 }]);

  cart = await getCart();

  return NextResponse.json({ checkoutUrl: cart?.checkoutUrl || null });
}
