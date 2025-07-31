import { getRedisClient } from '../lib/redis.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'Missing short ID' });
    }

    const redis = getRedisClient();
    const dataUrl = await redis.get(`url:${id}`);
    
    if (!dataUrl) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    
    res.status(200).json({ dataUrl });
  } catch (error) {
    console.error('Error retrieving URL:', error);
    res.status(500).json({ error: 'Failed to retrieve URL' });
  }
}