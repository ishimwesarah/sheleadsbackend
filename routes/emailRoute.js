// routes/emailRoutes.js

import express from 'express';
import sendEmail from '../Controllers/emailController.js';

const emailrouter = express.Router();

// POST route for sending an email
emailrouter.post('/send-email', sendEmail);

export default emailrouter;
