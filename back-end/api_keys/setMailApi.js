import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'


// Set API key for sendgrid
sgMail.setApiKey(dotenv.config().parsed.SENDGRID_API_KEY)


export default sgMail