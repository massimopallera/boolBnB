import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import connection from "../database/connection.js";
import argon from "./hash.js";

const login = (req, res) => {

    const { email, password } = req.body; 
    
    const SECRET_KEY = dotenv.config().parsed.JWT_SECRET;

    // Query
    const sql = `SELECT * FROM users WHERE email = ?`;


    connection.query(sql, [email], async (err, results) => {
        
        if (err) return res.status(500).json({ message: 'Errore interno del server' })

        // Controllo se l'utente esiste
        if (results.length === 0) return res.status(401).json({ message: 'Email o password errata' })

        // Estrazione dell'hash della password dal database
        const storedHash = results[0].password;

        try {

            // Verifica della password
            const isPasswordValid = argon.loginUser(storedHash, password);

            if (!isPasswordValid) return res.status(401).json({ message: 'Email o password errata' })

            // If user is authenticated, generate token JWT
            const token = jwt.sign({ user: results[0].name, lastname: results[0].last_name, id: results[0].id },SECRET_KEY,{ expiresIn: '30d' });


            // Create cookie
            res.cookie('jwt', token, {
                httpOnly: process.env.COOKIE_HTTPONLY,
                secure: process.env.COOKIE_SECURE,
                sameSite: process.env.COOKIE_SAMESITE,
                maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) || 3600000,
            });

            return res.json({ message: 'Login riuscito!'});

        } catch (err) {

            return res.status(500).json({ message: 'Errore interno del server' });
        }
    });
};

export default login