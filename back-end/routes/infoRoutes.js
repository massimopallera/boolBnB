import express from "express"
import controller from "../controllers/infoController.js"
const router = express.Router()


router.post('/', (req, res) => {
  if (!req.body.to || !req.body.subject || !req.body.text) {
    return res.status(400).json({ statuscode: 400, message: 'fields cannot be empty' })
  }
  const msg = {
    to: req.body.to,
    from: process.env.EMAIL_SENDGRID, // Change to your verified sender
    subject: req.body.subject,
    text: req.body.text,
    html: `<body>${req.body.html || null}</body>`,
  }

  controller.sendEmail(req, res, msg)
})


export default router