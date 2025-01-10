import connection from '../database/connection.js'
import md5 from 'md5';
import sha1 from 'sha1'



function show(req, res) {
    // get email and password
    const email = req.body.email
    const password = sha1(md5(req.body.password))

    console.log(`Email: ${email}, Password: ${password} ${req.body.password}`);


    const sql = `
    SELECT * FROM owners WHERE email = ? AND password = ?
    `

    connection.query(sql, [email, password], (err, results) => {
        if (err) return res.status(err).json({ error: err.message })

        if (results.length === 0) return res.status(404).json({ message: 'Email or Password incorrect' })

        res.status(200).json({ success: true, results: results })
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
        if (err) res.json({ err: err.message })

        res.status(200).json({ success: true })
    })

}

export default {
    //index,
    show,
    //store,
    update,
    // destroy
}