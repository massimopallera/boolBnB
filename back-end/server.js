// ⏬ imports
import express from "express"

// import routes
import apartmentsRouter from "./routes/apartmentsRoutes.js"
import reviewsRouter from "./routes/reviewsRoutes.js"
import ownersRouter from "./routes/ownersRoutes.js"
import loginRouter from "./routes/loginRoutes.js"
import infoRouter from "./routes/infoRoutes.js"

// import middlewares
import logger from "./middleware/logger.js"
import handlers from "./middleware/handlers.js"

import cors from 'cors'

const server = express()

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
server.use('/info', infoRouter)


// 🤝 handler
server.use(handlers.NotFound)
