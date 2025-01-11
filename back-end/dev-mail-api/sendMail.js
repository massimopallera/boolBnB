/* import sgMail from '@sendgrid/mail'

// Imposta la tua API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Funzione per inviare email
const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to, // Destinatario
    from: 'pallera.massimo@gmail.com', // Indirizzo del mittente (registrato su SendGrid)
    subject,
    text,
    html,
  };

  try {
    const response = await sgMail.send(msg);
    console.log('Email inviata con successo:', response);
  } catch (error) {
    console.error('Errore durante l\'invio dell\'email:', error.response.body);
  }
};
 */

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

// module.exports = sendEmail;
