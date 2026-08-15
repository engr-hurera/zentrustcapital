const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (toEmail, otpCode) => {
  const mailOptions = {
    from: `"Zen Trust Capital" <${process.env.EMAIL_USER}>`,

    to: toEmail,

    subject: "Verify Your Zen Trust Capital Account",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 520px;
        margin: auto;
        padding: 30px;
        border: 1px solid #e5e5e5;
        border-radius: 12px;
      ">

        <h2 style="
          text-align: center;
          color: #111;
          margin-bottom: 25px;
        ">
          Zen Trust Capital
        </h2>

        <p>
          Thank you for creating your Zen Trust Capital account.
        </p>

        <p>
          Please use the verification code below to verify your email address:
        </p>

        <div style="
          margin: 25px 0;
          padding: 18px;
          text-align: center;
          background: #f5f5f5;
          border-radius: 8px;
          font-size: 30px;
          font-weight: bold;
          letter-spacing: 8px;
          color: #10b981;
        ">
          ${otpCode}
        </div>

        <p style="
          font-size: 13px;
          color: #666;
        ">
          This verification code expires in 15 minutes.
        </p>

        <p style="
          font-size: 13px;
          color: #666;
        ">
          If you did not request this account, you can safely ignore this
          email.
        </p>

        <hr style="
          border: none;
          border-top: 1px solid #eee;
          margin: 25px 0;
        ">

        <p style="
          text-align: center;
          font-size: 11px;
          color: #999;
        ">
          Zen Trust Capital<br>
          Secure Account Verification
        </p>

      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};