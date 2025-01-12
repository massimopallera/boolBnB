// ⏬ imports
import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'


// import routes
import apartmentsRouter from "./routes/apartmentsRoutes.js"
import reviewsRouter from "./routes/reviewsRoutes.js"
import ownersRouter from "./routes/ownersRoutes.js"
import loginRouter from "./routes/loginRoutes.js"
import infoRouter from "./routes/infoRoutes.js"

// import middlewares
import logger from "./middleware/logger.js"
import handlers from "./middleware/handlers.js"

const server = express()
server.use(express.json())
server.use(cors())


// dev
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

server.use(cookieParser());

const SECRET_KEY = dotenv.config().parsed.JWT_SECRET





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
// server.use('/login', loginRouter)
server.use('/info', infoRouter)


  const authenticateJWT = (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (token) {
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token non valido' });
  
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ message: 'Autenticazione richiesta' });
    }
  };

server.get('/dashboard', authenticateJWT, (req, res) => {
    res.json({ message: `Benvenuto, ${req.user.username}!` })
})


server.post('/login', (req, res) => {

    const { username, password } = req.body;
      
        // Autenticazione fittizia
        if (username === 'user1' && password === 'password123') {
          const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      
          res.cookie('jwt', token, {
            httpOnly: process.env.COOKIE_HTTPONLY === 'true' || true,
            secure: process.env.COOKIE_SECURE === 'true' || false,
            sameSite: process.env.COOKIE_SAMESITE || 'strict',
            maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) || 3600000,
    
          });
      
      
          return res.json({ message: 'Login riuscito!' });
        } else {
          return res.status(401).json({ message: 'Credenziali non valide' });
        }

})


// 🤝 handler
server.use(handlers.NotFound)
