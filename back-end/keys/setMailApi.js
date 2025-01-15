import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

// Set API key for sendgrid
export default sgMail.setApiKey(dotenv.config().parsed.SENDGRID_API_KEY)