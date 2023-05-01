// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { stripe } from '@/lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { priceId } = req.body;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }

  if (!priceId) {
    return res.status(400).json({ error: 'Missing priceId' });
  }

  const successUrl = `${process.env.NEXT_URL}/success`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  res.status(201).json({ checkoutUrl: checkoutSession.url });
}
