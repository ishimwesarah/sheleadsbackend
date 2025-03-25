import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import nodemailer from "nodemailer";  // Import Nodemailer
import mainRouter from './routes/indexRouting.js';
import emailrouter from "./routes/emailRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors( ));
app.use(helmet());
app.use('/', mainRouter);
app.use('/', emailrouter); 


// Create a Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Gmail is used here, but you can change it based on your email provider
  auth: {
    user: process.env.EMAIL_USER,  // Use the EMAIL_USER from .env
    pass: process.env.EMAIL_PASS,  // Use the EMAIL_PASS from .env
  },
});

// Example route to send an email
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Set up the email data
  const mailOptions = {
    from: email,               // Sender email (from the form)
    to: process.env.EMAIL_USER,  // Receiver email (your email)
    subject: subject,          // Subject of the email
    text: `You have a new message from ${name} (${email}):\n\n${message}`,  // Email body
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to She Leads Finance API");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
