import connection from '../database/connection.js'
import handlers from '../middleware/handlers.js';
import logout from '../auth/logout.js';
import verifyToken from './verify.js'
import argon from './hash.js'

export default async function update(req, res) {

    const { password } = req.body;
       
    try {
        const decoded = verifyToken(req.cookies.jwt)
        const userId = decoded.id

        const hash_password = await argon.hashPassword(password);  
        
        const sql = `
        UPDATE users
        SET password = ?
        WHERE ID = ?
        `
    
        connection.query(sql, [hash_password, userId], (err, results) => {
            // Logout
            res.clearCookie('jwt', {
                httpOnly: true,
                secure: false, 
                sameSite: 'strict',
            })
  
            handlers.statusCode(req, res, results)
        })
        

    } catch (err) {
        // Gestione errori durante l'hashing della password
        console.error(err);
        // res.status(500).json({ error: "Errore durante il caricamento dei dati" });
        return res.status(500).json({ error: "Errore durante l'hashing della password" });
    }
}