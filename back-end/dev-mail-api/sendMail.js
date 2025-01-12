// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'


sgMail.setApiKey(dotenv.config().parsed.SENDGRID_API_KEY)
/* const msg = {
  to: 'test@example.com', // Change to your recipient
  from: process.env.EMAIL_SENDGRID, // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
 */
const sendEmail = (req,res,msg) => {
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => res.send(msg));
}

  export default sendEmail
