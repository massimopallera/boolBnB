import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

import dotenv from dotenv


const server = express()
server.use(express.json())

server.use(cookieParser());

const SECRET_KEY = dotenv.config().parsed.JWT_SECRET

server.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Autenticazione fittizia
    if (username === 'user1' && password === 'password123') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  
      res.cookie('jwt', token, {
        httpOnly: process.env.COOKIE_HTTPONLY === 'true',
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: process.env.COOKIE_SAMESITE || 'lax', // Valore predefinito
        maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) || 3600000, // Valore predefinito in caso di errore
      });
  
  
      return res.json({ message: 'Login riuscito!' });
    } else {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }
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
  
  // Endpoint protetto
  server.get('/dashboard', authenticateJWT, (req, res) => {
    res.json({ message: `Benvenuto, ${req.user.username}!` });
  });
  
  server.listen(3000, () => {
    console.log('Server in esecuzione su http://localhost:3000');
  });
  