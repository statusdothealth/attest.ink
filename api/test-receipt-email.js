import { sendApiKeyEmail } from './lib/email.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Test email data
  const testEmail = 'aharshbe@pm.me';
  const testApiKey = 'ak_TEST1234567890abcdefghijklmnopqr';
  const testPaymentDetails = {
    amount: 20.00,
    tax: 1.90,  // California tax example
    invoiceNumber: 'INV-TEST123'
  };

  try {
    console.log('Sending test receipt email to:', testEmail);
    
    const success = await sendApiKeyEmail(testEmail, testApiKey, testPaymentDetails);
    
    if (success) {
      res.status(200).json({ 
        success: true, 
        message: `Test receipt email sent successfully to ${testEmail}`,
        details: {
          email: testEmail,
          subtotal: testPaymentDetails.amount,
          tax: testPaymentDetails.tax,
          total: testPaymentDetails.amount + testPaymentDetails.tax,
          invoiceNumber: testPaymentDetails.invoiceNumber
        }
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to send email - check server logs for details' 
      });
    }
  } catch (error) {
    console.error('Error in test-receipt-email:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}