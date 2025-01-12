import sgMail from '../api_keys/setMailApi.js'

const sendEmail = (req,res,msg) => {
  sgMail
    .send(msg)
    .then(() => {
    //   console.log('Email sent')
      res.status(200).json({message: 'Email sent'})
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({message: 'Failed to send email'})
    })
}

export default {sendEmail}
