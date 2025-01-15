import hash from '../auth/hash.js';
import pool from '../database/pool.js'
import handlers from '../middleware/handlers.js';

// get all elements from users
function index(req, res) {

    const sql = 'SELECT * FROM users'

    pool.query(sql, (err, results) => {
        handlers.statusCode(req,res,results)
    })
}

// get a single element from users
function show(req, res) {

    const id = req.params.id
    const sql = 'SELECT * FROM users WHERE id =?'

    pool.query(sql, [id], (err, results) => {
        handlers.statusCode(req, res, results)
    })
}

// store new owner
async function store(req, res) {


    const hashed = await hash.hashPassword(req.body.password)
    const newOwner = { ...req.body, password: hashed }

    const {
        name,
        last_name,
        email,
        phone,
        password
    } = newOwner

    // console.log(password);
    // console.log(newOwner);
    

    const query = `
    INSERT INTO users (name, last_name, email, phone, password)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE email = email
`;


    //control if body request is correct
    pool.query(query, [name, last_name, email, phone, password], (err, results) => {
        handlers.controlFields(newOwner, req, res, results,err)
    })
        // if (err) return res.status(500).json({message: err.message})
        //     res.status(201).json(results)
        // })
    
}

// update owner
function update(req, res) {

    const id = req.params.id
    // const sql = 'UPDATE users SET /* values */ WHERE id = ?' 

    pool.query(sql, [id], (err, results) => {

        /* logic here */

    })
}

// delete owner
function destroy(req, res) {

    const id = req.params.id
    const sql = 'DELETE FROM users WHERE id = ?'

    pool.query(sql, [id], (err, results) => {
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