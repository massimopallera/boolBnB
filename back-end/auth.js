import express from 'express'
import jwt from 'jsonwebtoken'

import sha1 from 'sha1'
import md5 from 'md5'

import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'
import handlers from './middleware/handlers.js'
import connection from './database/connection.js'


// const server = express()
// server.use(express.json())

// server.use(cookieParser());

const SECRET_KEY = dotenv.config().parsed.JWT_SECRET


const router = express.Router()

router.post('/', (req, res) => {
    const { email, password } = req.body; 

    // query
    const sql = `SELECT * FROM owners WHERE email = ? AND password = ?`
    connection.query(sql, [email, sha1(md5(password))], (err, results) => {

  
    // Autenticazione fittizia
    if (handlers.statusCode(req,res,results) === true) {
      const token = jwt.sign({ user: results[0].name, lastname: results[0].last_name }, SECRET_KEY, { expiresIn: '30d' });
  
      res.cookie('jwt', token, {
        httpOnly: process.env.COOKIE_HTTPONLY === 'true',
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: process.env.COOKIE_SAMESITE || 'lax', // Valore predefinito
        maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) || 3600000, // Valore predefinito in caso di errore
      });
  
  
      return res.json({ message: 'Login riuscito!' });
    } else {
      return res.status(401).json({ message: 'Email o password errata' });
    }
  })

  });
  
  // Middleware per autenticazione
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
  
/*   // Endpoint protetto
  server.get('/dashboard', authenticateJWT, (req, res) => {
    res.json({ message: `Benvenuto, ${req.user.email}!` });
  });
  
  server.listen(3000, () => {
    console.log('Server in esecuzione su http://localhost:3000');
  });
   */

  export default router;