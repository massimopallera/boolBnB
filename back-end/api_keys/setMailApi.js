import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

sgMail.setApiKey(dotenv.config().parsed.SENDGRID_API_KEY)


export default sgMail