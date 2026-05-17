require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-quote", async (req, res) => {
  try {

    const { name, phone, email, service, date, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
    });

    await transporter.sendMail({
      from: email,

      to: process.env.EMAIL_USER,

      subject: "New Quote Request",

      html: `
        <h2>New Quote Request</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.status(200).json({
      success: true
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});