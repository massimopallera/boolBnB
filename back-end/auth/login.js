import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import pool from "../database/pool.js";
import argon2 from 'argon2'
/* 
const login = (req, res) => {

    const { email, password } = req.body; 
    
    const SECRET_KEY = dotenv.config().parsed.JWT_SECRET;

    // Query
    const sql = `SELECT * FROM users WHERE email = ?`;


    pool.query(sql, [email], async (err, results) => {
        
        if (err) return res.status(500).json({ success: false, message: 'Errore Interno del Server'})

        // Controllo se l'utente esiste
        if (results.length === 0) return res.status(401).json({ success: false, statusCode: 404 })

        // Estrazione dell'hash della password dal database
        const storedHash = results[0].password;

        try {

            // Verifica della password
            const isPasswordValid = argon.loginUser(storedHash, password);

            if (!isPasswordValid) return res.status(401).json({ success: false })

            // If user is authenticated, generate token JWT
            const token = jwt.sign({ user: results[0].name, lastname: results[0].last_name, id: results[0].id },SECRET_KEY,{ expiresIn: '30d' });


            // Create cookie
            res.cookie('jwt', token, {
                httpOnly: process.env.COOKIE_HTTPONLY,
                secure: process.env.COOKIE_SECURE,
                sameSite: process.env.COOKIE_SAMESITE,
                maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) || 3600000,
            });
            
            return res.status(200).json({ success: true });

        } catch (err) {

            return res.status(500).json({ success: false, message: 'Errore'});
        }
    });
};
 */

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
const PEPPER = process.env.PEPPER_KEY

const login = async (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;

    pool.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Errore database:', err);
            return res.status(500).json({ success: false, message: 'Errore Interno del Server' });
        }

        // Controllo se l'utente esiste
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Credenziali non valide' });
        }

        // Estrazione dell'hash della password dal database
        const storedHash = results[0].password;

        try {
            // Verifica della password
            const isPasswordValid = await argon2.verify(storedHash, password+PEPPER);

            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Credenziali non valide' });
            }

            // Generazione del token JWT
            const token = jwt.sign(
                {
                    user: results[0].name,
                    lastname: results[0].last_name,
                    id: results[0].id,
                },
                SECRET_KEY,
                { expiresIn: '30d' }
            );

            // Creazione del cookie con il token
            res.cookie('jwt', token, {
                httpOnly: process.env.COOKIE_HTTPONLY === 'true',
                secure: process.env.COOKIE_SECURE === 'true',
                sameSite: process.env.COOKIE_SAMESITE || 'Strict',
                maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) || 3600000, // 1 ora di default
            });

            return res.status(200).json({ success: true, message: 'Accesso eseguito con successo' });
        } catch (error) {
            console.error('Errore durante la verifica della password:', error);
            return res.status(500).json({ success: false, message: 'Errore durante il login' });
        }
    });
};

export default login