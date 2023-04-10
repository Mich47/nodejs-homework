const { getVerificationUrl } = require("../helpers");
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendVerificationEmail = async ({ email, verificationToken }) => {
  const verificationURL = getVerificationUrl(verificationToken);

  //TODO: Send email
  console.log("TODO: Send email");
  console.log("email ", email);
  console.log("verificationURL ", verificationURL);
  console.log("process.env.MAILTRAP_USER ", process.env.MAILTRAP_USER);
  console.log("process.env.MAILTRAP_PASSWORD ", process.env.MAILTRAP_PASSWORD);

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transport.sendMail({
    from: '"Fred Foo 👻" <dmytro.muzyka@meta.ua>',
    to: "joceb34719@djpich.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<b>Hello world? ${verificationURL}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  const message = "Verification email sent";

  return message;
};

module.exports = { sendVerificationEmail };
