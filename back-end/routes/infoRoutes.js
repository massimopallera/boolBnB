import express from "express"
import controller from "../controllers/infoController.js"
const router = express.Router()


router.post('/', (req,res) => { 
    const msg = {
      to: req.body.to, // Change to your recipient
      from: process.env.EMAIL_SENDGRID, // Change to your verified sender
      subject: req.body.subject, // Change to your
      text: req.body.text, // Change to your
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    
    controller.sendEmail(req,res, msg) 
  })


export default router