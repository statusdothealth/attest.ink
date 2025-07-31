import Stripe from 'stripe';
import { getRedisClient } from './lib/redis.js';
import { customAlphabet } from 'nanoid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const generateApiKey = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 32);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const email = session.customer_email || session.customer_details?.email;
    if (!email) {
      return res.status(400).json({ error: 'No email found in session' });
    }

    const redis = getRedisClient();
    
    // Check if API key already exists for this email
    let apiKey = await redis.get(`api_key:email:${email}`);
    
    if (!apiKey) {
      // Generate new API key
      apiKey = `ak_${generateApiKey()}`;
      
      // Store the API key mappings (never expire)
      await redis.set(`api_key:email:${email}`, apiKey);
      await redis.set(`api_key:${apiKey}`, JSON.stringify({
        email,
        created: new Date().toISOString(),
        stripeSessionId: sessionId
      }));
    }
    
    // If there was attestation data in the metadata, create the short URL
    let shortUrl = null;
    if (session.metadata?.attestationData) {
      try {
        const attestationData = JSON.parse(session.metadata.attestationData);
        const dataUrl = `data:application/json;base64,${btoa(JSON.stringify(attestationData))}`;
        
        // Generate short ID
        const shortIdGenerator = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8);
        let shortId;
        let exists = true;
        
        while (exists) {
          shortId = shortIdGenerator();
          exists = await redis.exists(`url:${shortId}`);
        }
        
        // Store permanently (no expiration)
        await redis.set(`url:${shortId}`, dataUrl);
        await redis.set(`url:${shortId}:owner`, email);
        
        shortUrl = `${process.env.VERCEL_URL || 'https://attest.ink'}/s/${shortId}`;
      } catch (error) {
        console.error('Error creating short URL from attestation data:', error);
      }
    }
    
    res.status(200).json({ 
      success: true, 
      apiKey,
      email,
      shortUrl
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}