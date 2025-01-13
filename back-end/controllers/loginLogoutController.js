import connection from '../database/connection.js'
import md5 from 'md5';
import sha1 from 'sha1'
import handlers from '../middleware/handlers.js';
import auth from '../auth/loginLogout.js';





function login(req, res) {
    auth.login(req, res)
}

function update(req, res) {

    const password = sha1(md5(req.body.password))
    const id = req.params.id

    const sql = `
    UPDATE owners
    SET password = ?
    WHERE id = ?
    `

    connection.query(sql, [password, id], (err, results) => {
        handlers.statusCode(req, res, results)
    })

}


const logout = (req, res) => {
    auth.logout(req, res)
    res.json({ message: 'logout successful' })
}


export default {
    login,
    update,
    logout
}