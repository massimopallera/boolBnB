import sendEmail from './emailService'

sendEmail({
  to: 'destinatario@email.com',
  subject: 'Prova invio email',
  text: 'Questa è una mail di prova',
  html: '<strong>Questa è una mail di prova</strong>',
});

export default sendEmail