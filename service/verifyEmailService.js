const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmailMsg = (userEmail, token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: 'srsrembeza7@meta.ua',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailOptions = {
    from: 'srsrembeza7@meta.ua',
    to: userEmail,
    subject: 'Confirm your Email',
    text: `Go to this address to verify your email http://localhost:3000/api/users/verify/${token}`,
    html: `<h1>Go to this address to verify your email <a style="color:blue;" href='http://localhost:3000/api/users/verify/${token}'>Click to confirm email</a></h1>`,
  };

  transporter
    .sendMail(emailOptions)
    .then(console.log('Email sent'))
    .catch(err => console.log(err));
};

module.exports = sendEmailMsg;

// const sgMail = require('@sendgrid/mail');
// require('dotenv').config();
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmailMsg = async (userEmail, token) => {
//   const msg = {
//     from: 'srsrembeza7@gmail.com',
//     to: userEmail,
//     subject: 'Confirm your Email',
//     text: `Go to this address to verify your email http://localhost:3000/api/users/verify/${token}`,
//     html: `<h1>Go to this address to verify your email <a style="color:blue;" href='http://localhost:3000/api/users/verify/${token}'>Click to confirm email</a></h1>`,
//   };

//   sgMail
//     .send(msg)
//     .then(console.log('Email sent'))
//     .catch(err => console.log(err));
// };
