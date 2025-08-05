import { sendPaymentNotification } from './lib/email.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Test data
  const testCustomerEmail = 'test@example.com';
  const testApiKey = 'ak_TEST1234567890abcdefghijklmnopqr';
  const testAmount = 21.75; // $20 + $1.75 tax

  try {
    console.log('Sending test founder notification email...');
    
    const success = await sendPaymentNotification(testCustomerEmail, testApiKey, testAmount);
    
    if (success) {
      res.status(200).json({ 
        success: true, 
        message: 'Test founder notification email sent successfully to founder@status.health',
        details: {
          customerEmail: testCustomerEmail,
          amount: testAmount,
          apiKey: testApiKey
        }
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to send email - check server logs for details' 
      });
    }
  } catch (error) {
    console.error('Error in test-founder-email:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}