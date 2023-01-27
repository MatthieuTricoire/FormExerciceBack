require("dotenv").config();

const express = require("express");
const cors = require("cors");

const formData = require("form-data");
const Mailgun = require("mailgun.js");

const app = express();
app.use(express.json());
app.use(cors());

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "Matthieu",
  key: process.env.MAILGUN_PRIVATE_API_KEY,
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Route Up !" });
});

app.post("/form", async (req, res) => {
  try {
    console.log(req.body);
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: "matthieutricoire@gmail.com",
      subject: req.body.subject,
      text: req.body.message,
    };
    const response = await client.messages.create(
      process.env.MAILGUN_DOMAIN,
      messageData
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(3000, () => {
  console.log("Server started");
});
