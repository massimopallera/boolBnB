import connection from '../database/connection.js'

// get all elements from owners
function index(req, res) {

    const sql = 'SELECT * FROM owners'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        return res.json(results);
    })
}

// get a single element from owners
function show(req, res) {

    const id = req.params.id
    const sql = 'SELECT * FROM owners WHERE id =?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) {
            return res.status(404).json({ err: 'Owner not found' })
        }
        res.json({ owner: results })
    })
}

// store new owner
function store(req, res) {

    const newOwner = { ...req.body }

    const sql = `
    INSERT INTO owners 
    VALUES ($1, $2, $3, $4, $5)
    `

    //control if body request is correct

    connection.query(sql, [Object.values(newOwner)], (err, results) => {
        if (err) return res.status(err.code).json({ err: err.message })

        res.status(201).json({ owner: results })
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