import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const authenticateJWT = (req, res, next) => {
  
    const token = req.cookies.jwt;
    const SECRET_KEY = dotenv.config().parsed.JWT_SECRET
    
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

export default authenticateJWT