import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const products = await request.json();

        const line_items = products.map((product) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}