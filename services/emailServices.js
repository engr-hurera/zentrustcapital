const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);


// ============================================================
// SEND EMAIL
// ============================================================

async function sendEmail({ to, subject, html }) {

  try {

    const { data, error } = await resend.emails.send({

      from: "onboarding@resend.dev",

      to: to,

      subject: subject,

      html: html,

    });


    if (error) {

      console.error("Resend email error:", error);

      throw new Error("Email could not be sent.");

    }


    console.log("Email sent successfully:", data);

    return data;

  }

  catch (error) {

    console.error("Email service error:", error);

    throw error;

  }

}


module.exports = {
  sendEmail,
};