import { getRedisClient } from './lib/redis.js';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { dataUrl, apiKey, email } = req.body;
    
    if (!dataUrl || !dataUrl.startsWith('data:')) {
      return res.status(400).json({ error: 'Invalid data URL' });
    }

    const redis = getRedisClient();
    
    // Verify API key or email
    let validUser = null;
    
    if (apiKey) {
      // Check if API key is valid
      const keyData = await redis.get(`api_key:${apiKey}`);
      if (keyData) {
        validUser = JSON.parse(keyData).email;
      }
    } else if (email) {
      // Check if email has an API key
      const existingKey = await redis.get(`api_key:email:${email}`);
      if (existingKey) {
        validUser = email;
      }
    }
    
    if (!validUser) {
      return res.status(403).json({ 
        error: 'Payment required',
        requiresPayment: true,
        message: 'Please purchase lifetime access to create permanent short URLs'
      });
    }
    
    // Generate a unique short ID
    let shortId;
    let exists = true;
    
    while (exists) {
      shortId = nanoid();
      exists = await redis.exists(`url:${shortId}`);
    }
    
    console.log('Generated short ID:', shortId);
    console.log('Storing for user:', validUser);
    
    // Store the mapping permanently (no expiration)
    await redis.set(`url:${shortId}`, dataUrl);
    await redis.set(`url:${shortId}:owner`, validUser);
    
    // Verify storage
    const stored = await redis.get(`url:${shortId}`);
    console.log('Verification - stored:', stored ? 'Success' : 'Failed');
    
    // Always use the production domain for short URLs
    const shortUrl = `https://attest.ink/s/${shortId}`;
    
    res.status(200).json({ shortUrl, shortId });
  } catch (error) {
    console.error('Error shortening URL:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Failed to shorten URL',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}