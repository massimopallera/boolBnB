import connection from '../database/connection.js'
import md5 from 'md5';
import sha1 from 'sha1'
import handlers from '../middleware/handlers.js';



function show(req, res) {
    // get email and password
    const email = req.body.email
    const password = sha1(md5(req.body.password))

    const sql = `
    SELECT * FROM owners WHERE email = ? AND password = ?
    `

    connection.query(sql, [email, password], (err, results) => {
        handlers.statusCode(req, res, results)
    })
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

export default {
    //index,
    show,
    //store,
    update,
    // destroy
}