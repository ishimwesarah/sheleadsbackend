// controllers/emailController.js

import nodemailer from 'nodemailer';

const sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other services as well
    auth: {
      user: process.env.EMAIL_USER, // From the .env file
      pass: process.env.EMAIL_PASS, // From the .env file
    },
  });

  // Email options
  const mailOptions = {
    from: email, // Sender email (from the form)
    to: process.env.EMAIL_USER, // Receiver email (your email)
    subject: subject, // Subject of the email
    text: `You have a new message from ${name} (${email}):\n\n${message}`, // Body of the email
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error sending email', error });
  }
};

export default sendEmail;
