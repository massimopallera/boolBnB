// ⏬ imports
import express from "express"
import dotenv from 'dotenv'
import apartmentsRouter from "./routes/apartmentsRoutes.js"
import reviewsRouter from "./routes/reviewsRoutes.js"
import ownersRouter from "./routes/ownersRoutes.js"
import logger from "./middleware/logger.js"
import loginRouter from "./routes/loginRoutes.js"
import infoRouter from "./routes/infoRoutes.js"
import handlers from "./middleware/handlers.js"

import cors from 'cors'

const server = express()

const tryRouter = express.Router()

server.use(express.json())
server.use(cors())

const HOST = process.env.HOST || "http://localhost"
const PORT = process.env.PORT || 3000

// start server listening 
server.listen(PORT, () => {
    console.log(`Listening on ${HOST}:${PORT}`)
})


// middleware
server.use('/', logger)

//Create a Server Error to test Server Error Handling
// server.use((req, res, next) => {
//     throw new Error('Try Server Error Handling')
//})

// 🔁 routes
server.use('/apartments', apartmentsRouter)
server.use('/reviews', reviewsRouter)
server.use('/owner', ownersRouter)
server.use('/login', loginRouter)



/* const msg = {
  to: 'test@example.com', // Change to your recipient
  from: process.env.EMAIL_SENDGRID, // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
 */

// console.log(dotenv.config().parsed.SENDGRID_API_KEY);





server.use('/testAPImail', infoRouter)

// 🤝 handler
server.use(handlers.NotFound)
