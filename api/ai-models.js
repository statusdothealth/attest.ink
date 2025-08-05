/**
 * API endpoint to return the current list of AI models
 * This can be updated to fetch from a remote source in the future
 */

// Import the models from the static file
import { AI_MODELS } from '../static/ai-models.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In the future, this could fetch from a remote API or database
    // For now, return the static model list
    res.status(200).json({
      success: true,
      models: AI_MODELS,
      lastUpdated: new Date().toISOString(),
      notice: "Models are regularly updated. Claude 4.1 Opus and GPT-5 (coming soon) have been added."
    });
  } catch (error) {
    console.error('Error fetching AI models:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch AI models' 
    });
  }
}