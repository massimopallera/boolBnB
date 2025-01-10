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
    const {
        description,
        rooms,
        beds,
        toilets,
        sq_meters,
        address,
        reference_mail,
        apartment_images,
        added_services,
        owner_id
    } = req.body;


    if (!description || !rooms || !beds || !toilets || !sq_meters || !address || !reference_mail || !apartment_images || !owner_id) {
        return res.status(400).json({ error: 'All fields must be compiled!' });
    }


    const sql = `
        INSERT INTO apartments (owner_id, description, rooms, beds, toilets, sq_meters, address, reference_mail, apartment_images, added_services)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const values = [
        owner_id,
        description,
        rooms,
        beds,
        toilets,
        sq_meters,
        address,
        reference_mail,
        apartment_images,
        added_services || null
    ];


    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error during inserting the apartment:', err);
            return res.status(500).json({ error: 'Error during inserting the apartment' });
        }


        res.status(201).json({
            message: 'Apartment inserted succesfully',

        });
    });
}


// update an apartment

function update(req, res) {

    const id = req.params.id

    const toUpdate = { ...req.body, id }

    /* const {
        description,
        rooms,
        beds,
        toilets,
        sq_meters,
        address,
        reference_mail,
        apartment_images,
        added_services
    } = req.body; */

    /*  if (!description || !rooms || !beds || !toilets || !sq_meters || !address || !reference_mail || !apartment_images || !added_services) {
         return res.status(400).json({ error: 'You must fill at least one field' });
     } */

    const sql = `
    UPDATE apartments
    SET
    owner_id = ?,
    description = ?,
        rooms = ?,
        beds = ?,
        toilets = ?,
        sq_meters = ?,
        address = ?,
        reference_mail = ?,
        apartment_images = ?,
        added_services = ?
    WHERE id = ?
    `
    connection.query(sql, Object.values(toUpdate), (err, results) => {
        if (err) {
            console.error('Error during updating the apartment:', err);
            return res.status(500).json({ error: 'Error during updating the apartment' });
        }


        res.status(201).json({
            success: true
        });
    })
}

// delete an apartment //ma serve?
// function destroy(req, res) {}


export default {
    index,
    show,
    store,
    update,
    // destroy
}