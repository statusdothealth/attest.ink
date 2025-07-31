import { Redis } from '@upstash/redis';

let redis;

export function getRedisClient() {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    
    console.log('Redis URL:', url ? 'Present' : 'Missing');
    console.log('Redis Token:', token ? 'Present' : 'Missing');
    
    if (!url || !token) {
      throw new Error('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN environment variables');
    }
    
    redis = new Redis({
      url,
      token,
    });
  }
  
  return redis;
}