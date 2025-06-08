import sgMail from '../keys/setMailApi.js'


// send an email
const sendEmail = (req, res, msg, autoMsg) => {
  sgMail
    .send(msg)
    .then(() => {
      console.log('First email sent');
      return sgMail.send(autoMsg); // Chain the second email
    })
    .then(() => {
      console.log('Auto email sent');
      res.status(200).json({ statusCode: 200, message: 'Both emails sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).json({ statusCode: 500, message: 'Failed to send one or more emails' });
    });
};


export default { sendEmail } //in an object in case of future functions for controller
