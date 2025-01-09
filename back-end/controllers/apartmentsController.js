import connection from '../database/connection.js'

// get all elements from apartments
function index(req, res) {

    const sql = 'SELECT * FROM apartments'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        return res.json(results);
    })
}

// get a single element from apartments
function show(req, res) {

    const id = req.params.id
    const sql = 'SELECT * FROM apartments WHERE id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) {
            return res.status(404).json({ err: 'Apartment not found' })
        }

        res.json({ apartment: results })
    })
}

// store an apartment
function store(req, res) {

    //optimize code and query

    // const sql = `
    // INSERT INTO apartments
    // VALUES ($1)
    // `

    const apartment = {
        description : req.body.description,
        rooms : req.body.rooms,
        beds : req.body.beds,
        toilets : req.body.toilets,
        sq_meters : req.body.sq_meters,
        address : req.body.address,
        reference_mail : req.body.reference_mail,
        apartment_images : req.body.apartment_images,
        added_services : req.body.added_services,
}

    connection.query(sql, [apartment],(err, results) => { })

}

// update an apartment
// function update(req, res) {}

// delete an apartment
// function destroy(req, res) {}


export default {
    index,
    show,
    store,
    // update,
    // destroy
}