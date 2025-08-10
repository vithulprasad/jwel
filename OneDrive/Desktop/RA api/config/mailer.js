const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:  "vidhueco123@gmail.com",
    pass: "xwhla hgjuklclcxb",
  },
});

const sendEmail = async(to, subject, text) => {
  const mailOptions = {
    from: "vidhueco123@gmail.com",
    to,
    subject,
    text,
  };

  return await  transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };