const nodemailer = require("nodemailer");


// ============================================================
// EMAIL TRANSPORTER
// ============================================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// ============================================================
// SEND EMAIL VERIFICATION OTP
// ============================================================

exports.sendVerificationEmail = async (
  toEmail,
  otpCode
) => {

  const mailOptions = {

    from:
      `"Zen Trust Capital" <${process.env.EMAIL_USER}>`,

    to: toEmail,

    subject:
      "Verify Your Zen Capital Trust Account Email",

    html: `

      <div
        style="
          font-family: Arial, sans-serif;
          max-width: 500px;
          margin: auto;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 10px;
        "
      >

        <h2
          style="
            color: #111;
            text-align: center;
          "
        >
          Zen Trust Capital
        </h2>

        <p>
          Thank you for starting your account setup.
          Use the secure 6-digit code below to
          verify your email address:
        </p>

        <div
          style="
            background: #f4f4f4;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #10b981;
            margin: 20px 0;
            border-radius: 5px;
          "
        >
          ${otpCode}
        </div>

        <p
          style="
            font-size: 12px;
            color: #666;
            text-align: center;
          "
        >
          This code will expire automatically
          in 15 minutes.
        </p>

      </div>

    `,
  };

  return transporter.sendMail(mailOptions);
};


// ============================================================
// SEND PASSWORD RESET EMAIL
// ============================================================

exports.sendPasswordResetEmail = async (
  toEmail,
  resetUrl
) => {

  const mailOptions = {

    from:
      `"Zen Trust Capital" <${process.env.EMAIL_USER}>`,

    to: toEmail,

    subject:
      "Reset Your Zen Trust Capital Password",

    html: `

      <div
        style="
          font-family: Arial, sans-serif;
          max-width: 500px;
          margin: auto;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 10px;
        "
      >

        <h2
          style="
            color: #111;
            text-align: center;
          "
        >
          Zen Trust Capital
        </h2>

        <p>
          We received a request to reset the password
          for your account.
        </p>

        <p>
          Click the button below to create a new password.
        </p>

        <div
          style="
            text-align: center;
            margin: 30px 0;
          "
        >

          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 24px;
              background: #10b981;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            Reset My Password
          </a>

        </div>

        <p
          style="
            font-size: 13px;
            color: #666;
          "
        >
          This password reset link will expire
          automatically in 15 minutes.
        </p>

        <p
          style="
            font-size: 13px;
            color: #666;
          "
        >
          If you did not request a password reset,
          you can safely ignore this email.
        </p>

      </div>

    `,
  };

  return transporter.sendMail(mailOptions);
};