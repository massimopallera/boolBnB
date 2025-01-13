import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import connection from "../database/connection.js";
import argon from "../dev_argon/hash.js";

const login = (req, res) => {
    const { email, password } = req.body; 
    const SECRET_KEY = dotenv.config().parsed.JWT_SECRET;

    // Query
    const sql = `SELECT * FROM users WHERE email = ?`;

    connection.query(sql, [email], async (err, results) => { // Rimosso password dal filtro SQL
        if (err) {
            console.error('Errore nella query:', err);
            return res.status(500).json({ message: 'Errore interno del server' });
        }

        // Controllo se l'utente esiste
        if (results.length === 0) {
            return res.status(401).json({ message: 'Email o password errata' });
        }

        // Estrazione dell'hash della password dal database
        const storedHash = results[0].password;

        try {
            // Verifica della password
            const isPasswordValid = await argon.loginUser(storedHash, password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Email o password errata' });
            }

            // Autenticazione riuscita, generazione del token JWT
            const token = jwt.sign({ user: results[0].name, lastname: results[0].last_name },SECRET_KEY,{ expiresIn: '30d' });

            res.cookie('jwt', token, {
                httpOnly: process.env.COOKIE_HTTPONLY === 'true',
                secure: process.env.COOKIE_SECURE === 'true',
                sameSite: process.env.COOKIE_SAMESITE || 'lax',
                maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) || 3600000, // Token expiration
            });

            return res.json({ message: 'Login riuscito!'});
        } catch (err) {
            // console.error('Errore durante la verifica della password:', err);
            return res.status(500).json({ message: 'Errore interno del server' });
        }
    });
};



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