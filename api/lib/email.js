import nodemailer from 'nodemailer';

let transporter;

export function getEmailTransporter() {
  if (!transporter) {
    const user = process.env.SMTP_USER || process.env.GMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = process.env.SMTP_PORT || 587;
    
    if (!user || !pass) {
      console.error('Email credentials not configured');
      return null;
    }
    
    transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: port === '465', // true for 465, false for other ports
      auth: {
        user,
        pass
      }
    });
  }
  
  return transporter;
}

export async function sendApiKeyEmail(email, apiKey) {
  console.log('sendApiKeyEmail called with email:', email);
  const transporter = getEmailTransporter();
  
  if (!transporter) {
    console.error('Email transporter not configured, skipping email');
    console.error('Email environment variables check:');
    console.error('SMTP_USER:', process.env.SMTP_USER ? 'Present' : 'Missing');
    console.error('GMAIL_USER:', process.env.GMAIL_USER ? 'Present' : 'Missing');
    console.error('SMTP_PASS:', process.env.SMTP_PASS ? 'Present' : 'Missing');
    console.error('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Present' : 'Missing');
    return false;
  }
  
  const fromName = process.env.EMAIL_NAME || 'attest.ink';
  const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.GMAIL_USER;
  
  const mailOptions = {
    from: `${fromName} <${fromEmail}>`,
    to: email,
    subject: 'Your attest.ink API Key - Lifetime Access Activated! 🎉',
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://attest.ink/assets/logo/circular-2-ai.svg" alt="attest.ink" style="width: 80px; height: 80px;">
          <h1 style="margin: 20px 0; color: #111827;">Welcome to attest.ink Pro!</h1>
        </div>
        
        <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
          <h2 style="margin-top: 0; color: #111827;">Your API Key</h2>
          <code style="display: block; background: #111827; color: #10b981; padding: 15px; border-radius: 4px; font-size: 16px; word-break: break-all;">
            ${apiKey}
          </code>
        </div>
        
        <h3 style="color: #111827;">What is this API key for?</h3>
        <p style="color: #4b5563; line-height: 1.6;">
          Your API key gives you lifetime access to create permanent short URLs for your AI attestations. 
          It's automatically saved in your browser, but keep this email for backup access on other devices.
        </p>
        
        <h3 style="color: #111827;">How to use it:</h3>
        <ul style="color: #4b5563; line-height: 1.8;">
          <li><strong>Automatic:</strong> Your browser already has the key saved - just create attestations as normal!</li>
          <li><strong>Other devices:</strong> The system will recognize your email and activate your access</li>
          <li><strong>API access:</strong> Use this key for programmatic URL shortening</li>
        </ul>
        
        <h3 style="color: #111827;">Your benefits:</h3>
        <ul style="color: #4b5563; line-height: 1.8;">
          <li>✓ Unlimited permanent short URLs</li>
          <li>✓ URLs never expire</li>
          <li>✓ One-time payment, lifetime access</li>
          <li>✓ API access for automation</li>
        </ul>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Thank you for supporting attest.ink!</p>
          <p>
            <a href="https://attest.ink" style="color: #3b82f6; text-decoration: none;">attest.ink</a> • 
            <a href="https://github.com/statusdothealth/attest.ink" style="color: #3b82f6; text-decoration: none;">GitHub</a>
          </p>
        </div>
      </div>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('API key email sent to:', email);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}