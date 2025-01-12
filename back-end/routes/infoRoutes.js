import express from "express"
import controller from "../controllers/infoController.js"
const router = express.Router()


router.post('/', (req,res) => { 
    const msg = {
      to: req.body.to,
      from: process.env.EMAIL_SENDGRID, // Change to your verified sender
      subject: req.body.subject, 
      text: req.body.text,
      html: req.body.html || null,
    }
    
    controller.sendEmail(req,res, msg) 
  })


export default router