import Stripe from 'stripe';
import { getRedisClient } from './lib/redis.js';
import { sendApiKeyEmail, sendPaymentNotification } from './lib/email.js';
import { customAlphabet } from 'nanoid';

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
    
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return res.status(500).json({ error: 'Stripe configuration error' });
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
        
        shortUrl = `https://attest.ink/s/${shortId}`;
      } catch (error) {
        console.error('Error creating short URL from attestation data:', error);
      }
    }
    
    // Get payment details for the receipt
    const paymentDetails = {
      amount: session.amount_subtotal / 100,
      tax: session.total_details?.amount_tax ? session.total_details.amount_tax / 100 : 0,
      invoiceNumber: session.invoice || `INV-${sessionId.slice(-8).toUpperCase()}`
    };
    
    // Send confirmation email to customer
    console.log('Attempting to send confirmation email to customer:', email);
    sendApiKeyEmail(email, apiKey, paymentDetails).then(success => {
      if (success) {
        console.log('Customer email sent successfully to:', email);
      } else {
        console.log('Customer email sending failed for:', email);
      }
    }).catch(err => {
      console.error('Failed to send customer email:', err);
      console.error('Customer email error details:', err.message);
      console.error('SMTP configuration:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER ? 'Set' : 'Missing',
        pass: process.env.SMTP_PASS ? 'Set' : 'Missing'
      });
    });

    // Send notification email to founder
    console.log('Sending payment notification to founder@status.health');
    sendPaymentNotification(email, apiKey, session.amount_total / 100).then(success => {
      if (success) {
        console.log('Founder notification sent successfully');
      } else {
        console.log('Founder notification failed');
      }
    }).catch(err => {
      console.error('Failed to send founder notification:', err);
    });
    
    // Get attestation ID from session metadata
    const attestationId = session.metadata?.attestationId;
    
    res.status(200).json({ 
      success: true, 
      apiKey,
      email,
      shortUrl,
      attestationId
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}