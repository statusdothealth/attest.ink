import Stripe from 'stripe';
import { getRedisClient } from './lib/redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, attestationData, attestationId } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return res.status(500).json({ error: 'Stripe configuration error' });
    }
    
    // Log key prefix for debugging (safe to log the prefix)
    console.log('Stripe key prefix:', process.env.STRIPE_SECRET_KEY.substring(0, 7));
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const redis = getRedisClient();
    
    // Check if user already has lifetime access
    const existingKey = await redis.get(`api_key:email:${email}`);
    if (existingKey) {
      return res.status(200).json({ 
        alreadyPurchased: true, 
        apiKey: existingKey,
        message: 'You already have lifetime access!' 
      });
    }

    // Create Stripe checkout session
    console.log('Creating checkout session for email:', email);
    
    // Always use the production URL for checkout redirects
    const baseUrl = 'https://www.attest.ink';
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'attest.ink Lifetime Short URLs',
              description: 'Create unlimited permanent short URLs for your AI attestations',
              images: ['https://www.attest.ink/assets/logo/circular-2-ai.svg'],
            },
            unit_amount: 2000, // $20.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/create/`,
      customer_email: email,
      metadata: {
        email: email,
        attestationId: attestationId || '',
        attestationData: attestationData ? JSON.stringify(attestationData).substring(0, 400) : '' // Stripe has metadata size limits
      },
    });

    res.status(200).json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    console.error('Error details:', error.message);
    if (error.type === 'StripeAuthenticationError') {
      return res.status(500).json({ error: 'Stripe authentication failed. Check your API key.' });
    }
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}