import connection from '../database/connection.js'
import handlers from '../middleware/handlers.js';
import auth from '../auth/logout.js';
import argon from './hash.js'

export default async function update(req, res) {

    const { password } = req.body;
       
    try {
        const decoded = auth.verifyToken(req.cookies.jwt)
        const userId = decoded.id

        const hash_password = await argon.hashPassword(password);  
        
        const sql = `
        UPDATE users
        SET password = ?
        WHERE ID = ?
        `
    
        connection.query(sql, [hash_password, userId], (err, results) => {
            handlers.statusCode(req, res, results)
        })
    } catch (err) {
        // Gestione errori durante l'hashing della password
        return res.status(500).json({ error: 'Errore durante il hashing della password' });
    }
}