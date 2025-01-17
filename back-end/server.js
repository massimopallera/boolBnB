// ⏬ imports
import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser' // for cookies parsing
import path from 'path';
import { fileURLToPath } from 'url';

// Calcola __dirname con ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import routes
import apartmentsRouter from "./routes/apartmentsRoutes.js"
import authRouter from "./routes/AuthenticationRoutes.js"
import authenticateJWT from './auth/authenticateJWT.js'
import reviewsRouter from "./routes/reviewsRoutes.js"
import ownersRouter from "./routes/ownersRoutes.js"
import infoRouter from "./routes/infoRoutes.js"

// import middlewares
import logger from "./middleware/logger.js"
import handlers from "./middleware/handlers.js"

const server = express()


const corsOptions = {
    origin: 'http://localhost:5173', // Indica l'origine esatta del frontend
    credentials: true, // Consenti l'invio di credenziali
};


server.use(express.json())
server.use(cookieParser());
server.use(cors(corsOptions))

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
server.use('/user', ownersRouter)
server.use('/info', infoRouter)
server.use('/', authRouter)

// authenticateJWT controls if a user is authenticated
server.get('/dashboard', authenticateJWT, (req, res) => {
    res.json({ message: `Benvenuto, ${req.user.user} ${req.user.lastname}!` })
})

// 🤝 handler
server.use(handlers.NotFound)



server.use('/uploads', express.static(path.join(__dirname, 'uploads')));