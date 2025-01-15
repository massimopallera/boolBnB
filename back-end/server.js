// ⏬ imports
import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser' // for cookies parsing

// import routes
import apartmentsRouter from "./routes/apartmentsRoutes.js"
import loginRouter from "./routes/loginLogoutRoutes.js"
import authenticateJWT from './auth/authentication.js'
import reviewsRouter from "./routes/reviewsRoutes.js"
import ownersRouter from "./routes/ownersRoutes.js"
import infoRouter from "./routes/infoRoutes.js"

// import middlewares
import logger from "./middleware/logger.js"
import handlers from "./middleware/handlers.js"

const server = express()

server.use(express.json())
server.use(cookieParser());
server.use(cors())

const HOST = process.env.HOST || "http://localhost"
const PORT = process.env.PORT || 3000

// start server listening 
server.listen(PORT, () => {
    console.log(`Listening on ${HOST}:${PORT}`)
})


// middleware
server.use('/', logger)



// 🔁 routes
server.use('/apartments', apartmentsRouter)
server.use('/reviews', reviewsRouter)
server.use('/owner', ownersRouter)
server.use('/info', infoRouter)
server.use('/', loginRouter)

// authenticateJWT controls if a user is authenticated
server.get('/dashboard', authenticateJWT, (req, res) => {
    res.json({ message: `Benvenuto, ${req.user.user} ${req.user.lastname}!` })
})

// 🤝 handler
server.use(handlers.NotFound)
