import { sendApiKeyEmail } from './lib/email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Generate a test API key
    const testApiKey = 'ak_test1234567890abcdefghijklmnopqr';
    const testEmail = 'founder@status.health';
    
    console.log('Sending test email to:', testEmail);
    
    const success = await sendApiKeyEmail(testEmail, testApiKey);
    
    if (success) {
      res.status(200).json({ 
        success: true, 
        message: 'Test email sent successfully to founder@status.health'
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send test email'
      });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
}