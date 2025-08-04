import { sendApiKeyEmail } from './lib/email.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const testEmail = req.query.email || 'founder@status.health';
  const testApiKey = 'ak_TEST_1234567890';
  
  console.log('Testing email to:', testEmail);
  
  try {
    const success = await sendApiKeyEmail(testEmail, testApiKey);
    
    res.status(200).json({ 
      success,
      message: success ? 'Email sent successfully' : 'Email failed to send',
      to: testEmail
    });
  } catch (error) {
    console.error('Email test error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}