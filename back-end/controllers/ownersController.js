import md5 from 'md5';
import sha1 from 'sha1';
import connection from '../database/connection.js'

import handlers from '../middleware/handlers.js';

// get all elements from owners
function index(req, res) {

    const sql = 'SELECT * FROM owners'

    connection.query(sql, (err, results) => {
        handlers.statusCode(req,res,results)
    })
}

// get a single element from owners
function show(req, res) {

    const id = req.params.id
    const sql = 'SELECT * FROM owners WHERE id =?'

    connection.query(sql, [id], (err, results) => {
        handlers.statusCode(req, res, results)
    })
}

// store new owner
function store(req, res) {

    const newOwner = { ...req.body }
    newOwner.password = sha1(md5(newOwner.password))

    const sql = `
    INSERT INTO owners
    (name, last_name, email, phone, password)
    VALUES (?,?,?,?,?)
    `

    const query = `
    INSERT INTO owners (name, last_name, email, phone, password)
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
    // const sql = 'UPDATE owners SET /* values */ WHERE id = ?' 

    connection.query(sql, [id], (err, results) => {

        /* logic here */

    })
}

// delete owner
function destroy(req, res) {

    const id = req.params.id
    const sql = 'DELETE FROM owners WHERE id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(err.code).json({ err: err })
        res.status(204).json({ message: 'deleted owner' })
    })

}

export default {
    index,
    show,
    store,
    update,
    destroy
}