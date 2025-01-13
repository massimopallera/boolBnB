import connection from '../database/connection.js'
import handlers from '../middleware/handlers.js';
import auth from '../auth/loginLogout.js';
import argon from '../dev_argon/hash.js'


function login(req, res) {
    auth.login(req, res)
}

async function update(req, res) {

    const { password } = req.body;
    const id = req.params.id
   
    const decoded = auth.verifyToken(req.cookies.jwt)

    console.log(decoded)
    
    try {
        const hash_password = await argon.hashPassword(password);  

        // controlla che la mail in jwt corrisponda alla mail della query

        const sql = `
        UPDATE users
        SET password = ?
        WHERE ID = ?
        `
    
        connection.query(sql, [hash_password, id], (err, results) => {


            handlers.statusCode(req, res, results)
        })
    }catch (err) {
        // Gestione errori durante l'hashing della password
        return res.status(500).json({ error: 'Errore durante il hashing della password' });
    }
   

}


const logout = (req, res) => {
    auth.logout(req, res)
    res.json({ message: 'logout eseguito correttamente' })
}


export default {
    login,
    update,
    logout
}