const { getVerificationUrl } = require("../helpers");

const sendVerificationEmail = ({ email, verificationToken }) => {
  const verificationURL = getVerificationUrl(verificationToken);

  //TODO: Send email
  console.log("TODO: Send email");
  console.log("email ", email);
  console.log("verificationURL ", verificationURL);

  const message = "Verification email sent";

  return message;
};

module.exports = { sendVerificationEmail };
