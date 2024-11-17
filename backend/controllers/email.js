const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendMail( type,id, email) {

  if (type=="verify") {
    try {

      const emailToken = jwt.sign({ id: id }, "email1234", {
        expiresIn: '1d',
      })
      
      const url = `https://germanclasses.onrender.com/confirmation/${emailToken}`;
      await transporter.sendMail({
        to: email,
        subject: 'Confirm Email',
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  else {
    try {
     
      await transporter.sendMail({
        to: email,
        subject: 'Payment Done',
        html: `Your payment has been done successfully. Your payment id is : ${id} for any payment related query please mail us at support@class.com with your payment id`,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = sendMail;