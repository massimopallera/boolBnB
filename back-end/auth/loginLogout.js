import md5 from "md5";
import sha1 from "sha1";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

import connection from "../database/connection.js";
import handlers from "../middleware/handlers.js";


const login = (req, res) => {
    
    const { email, password } = req.body; 
    const SECRET_KEY = dotenv.config().parsed.JWT_SECRET
    
    // query
    const sql = `SELECT * FROM owners WHERE email = ? AND password = ?`
    connection.query(sql, [email, sha1(md5(password))], (err, results) => {
        
        //Authentication 
        if (handlers.statusCode(req,res,results) === true) {

            const token = jwt.sign({ user: results[0].name, lastname: results[0].last_name }, SECRET_KEY, { expiresIn: '30d' });

            res.cookie('jwt', token, {
                httpOnly: process.env.COOKIE_HTTPONLY === 'true',
                secure: process.env.COOKIE_SECURE === 'true',
                sameSite: process.env.COOKIE_SAMESITE || 'lax',
                maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) || 3600000, // Token expiration
            });


            return res.json({ message: 'Login riuscito!' });
        } else {
            return res.status(401).json({ message: 'Email o password errata' });
        }
})}


const logout = (req, res) => {

    // Remove login
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: false, 
      sameSite: 'strict',
    })
  
    // return res.json({ message: 'Logout riuscito!' });
}


export default {login, logout}