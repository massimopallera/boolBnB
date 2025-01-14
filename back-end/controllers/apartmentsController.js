import connection from '../database/connection.js'
import handlers from '../middleware/handlers.js'

// get all elements from apartments
function index(req, res) {

    const sql = 'SELECT * FROM apartments'

    connection.query(sql, (err, results) => {
        handlers.statusCode(req, res, results)
    })
}

// get a single element from apartments
function show(req, res) {

    const id = req.params.id
    const sql = 'SELECT * FROM apartments WHERE id = ?'

    connection.query(sql, [id], (err, results) => {
        handlers.statusCode(req, res, results)
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
        apartment_images,
        added_services,
        // user_id
    } = req.body;



    // DA CONTROLLARE LA QUERY
    const sql = `
        INSERT INTO apartments (user_id, description, rooms, beds, toilets, sq_meters, address, reference_mail, apartment_images, added_services)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    /*  const values = [
         owner_id,
         description,
         rooms,
         beds,
         toilets,
         sq_meters,
         address,
         apartment_images,
         added_services || null
     ]; */


    connection.query(sql, [
        owner_id,
        description,
        rooms,
        beds,
        toilets,
        sq_meters,
        address,
        apartment_images,
    ], (err, results) => {
        handlers.controlFields({ ...req.body }, req, res, results)
    });
}


// update an apartment

function update(req, res) {

    const id = req.params.id

    const toUpdate = { ...req.body, id }

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
        // if (err) {
        //     console.error('Error during updating the apartment:', err);
        //     return res.status(500).json({ error: 'Error during updating the apartment' });
        // }

        // res.status(201).json({
        //     success: true
        // });
        handlers.controlFields({ ...req.body }, req, res, results)
    })
}


export default {
    index,
    show,
    store,
    update,
}