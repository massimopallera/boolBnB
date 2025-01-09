import connection from '../database/connection.js'

function index(req, res) {

    const sql = 'SELECT * FROM owners'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        return res.json(results);
    })
}

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

function store(req, res) {

    const owner = {
        // id: req.body.id, //auto increment
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    }
}

function update(req, res) { }

function destroy(req, res) { }

export default {
    index,
    show,
    store,
    update,
    destroy
}