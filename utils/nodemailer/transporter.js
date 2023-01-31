const nodemailer = require("nodemailer");
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465,
  host: "mail.sanlamamba.com",
  auth: {
    user: "test@sanlamamba.com",
    pass: "@passwordTest1234+",
  },
  secure: true,
});

const mailData = {
  from: "youremail@gmail.com",
  to: "myfriend@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
  html: "<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>",
};

module.exports = transporter;
