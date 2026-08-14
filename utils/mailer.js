const nodemailer = require("nodemailer");

// Create the email engine using the credentials from your .env file
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Utility function to send verification codes
 * @param {string} toEmail - The user's input email address
 * @param {string} otpCode - The 6-digit verification number
 */
exports.sendVerificationEmail = async (toEmail, otpCode) => {
  const mailOptions = {
    from: `"Zen Trust Capital" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify Your Zen Capital Trust Account Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #111; text-align: center;">Zen Trust Capital</h2>
        <p>Thank you for starting your account setup. Use the secure 6-digit code below to verify your email address:</p>
        <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #10b981; margin: 20px 0; border-radius: 5px;">
          ${otpCode}
        </div>
        <p style="font-size: 12px; color: #666; text-align: center;">This code will expire automatically in 15 minutes.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
