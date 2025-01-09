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

    const owner = {
        // id: req.body.id, //auto increment
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    }
}

// update owner
function update(req, res) { }

// delete owner
function destroy(req, res) { }

export default {
    index,
    show,
    store,
    update,
    destroy
}