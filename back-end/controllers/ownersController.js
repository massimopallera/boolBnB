import connection from '../database/connection.js'
import handlers from '../middleware/handlers.js';

// get all elements from users
function index(req, res) {

    const sql = 'SELECT * FROM users'

    connection.query(sql, (err, results) => {
        handlers.statusCode(req,res,results)
    })
}

// get a single element from users
function show(req, res) {

    const id = req.params.id
    const sql = 'SELECT * FROM users WHERE id =?'

    connection.query(sql, [id], (err, results) => {
        handlers.statusCode(req, res, results)
    })
}

// store new owner
function store(req, res) {

    const newOwner = { ...req.body }
    newOwner.password = sha1(md5(newOwner.password))

    const sql = `
    INSERT INTO users
    (name, last_name, email, phone, password)
    VALUES (?,?,?,?,?)
    `

    const query = `
    INSERT INTO users (name, last_name, email, phone, password)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE email = email; -- Non fa nulla se email esiste
`;


    //control if body request is correct
    connection.query(query, Object.values(newOwner), (err, results) => {
        handlers.controlFields(newOwner, req, res, results,err)
    })
}

// update owner
function update(req, res) {

    const id = req.params.id
    // const sql = 'UPDATE users SET /* values */ WHERE id = ?' 

    connection.query(sql, [id], (err, results) => {

        /* logic here */

    })
}

// delete owner
function destroy(req, res) {

    const id = req.params.id
    const sql = 'DELETE FROM users WHERE id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(err.code).json({ err: err })
        res.status(204).json({ message: 'utente rimosso' })
    })

}

export default {
    index,
    show,
    store,
    update,
    destroy
}