// imports
import express from "express"
import apartmentsRouter from "./routes/apartmentsRoutes.js"
import reviewsRouter from "./routes/reviewsRoutes.js"
import logger from "./middleware/logger.js"

import loginRouter from "./database/login.js"

const server = express()

server.use(express.json())


const HOST = process.env.HOST || "http://localhost"
const PORT = process.env.PORT || 3000

// start server listening 
server.listen(PORT, () => {
    console.log(`Listening on ${HOST}:${PORT}`)
})


// middleware
server.use('/', logger)

// routes
server.use('/apartments', apartmentsRouter)
server.use('/reviews', reviewsRouter)
server.use('/login', loginRouter)