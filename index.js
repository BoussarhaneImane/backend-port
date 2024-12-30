const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Initialiser Nodemailer avec un transporteur
const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,  // Gmail or other SMTP service
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
      user: process.env.SMTP_MAIL,   // Your email (e.g., Gmail)
      pass: process.env.SMTP_PASS,   // Your app password or actual email password
  }
});

app.use(express.json());
app.use(cors({ origin: '*' }));

// Endpoint pour envoyer un e-mail
app.post('/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;

  console.log('Received request:', req.body); // Log incoming data

  // Créer l'e-mail
  const mailOptions = {
    from: process.env.SMTP_MAIL,  // Your email address
    to: 'boussarhaneimane@gmail.com',  // Destination email address
    subject: 'New Contact Form Submission',  // Subject of the email
    text: `Hello! You've received a new message from ${name} (${email}, ${phone}):\n\n${message}`,  // Body of the email
  };

  // Envoyer l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);  // Log error if any
      return res.status(500).send({ success: false, error: error.message });
    }
    console.log('Email sent successfully:', info.messageId);  // Log success
    res.status(200).send({ success: true, messageId: info.messageId });
  });
});

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Lancer le serveur
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
