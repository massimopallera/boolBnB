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

    const id = Number(req.params.id)
    
    const sql = `
    SELECT ap.*, users.email AS email
    FROM apartments AS ap
    INNER JOIN users ON users.id = ap.id_user
    WHERE ap.id = ?
    `

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
        apartments_images,
    } = req.body;


    const sql = `
        INSERT INTO apartments (id_user, description, rooms, beds, toilets, sq_meters, address, apartments_images)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [
        description,
        Number(rooms),
        Number(beds),
        Number(toilets),
        Number(sq_meters),
        address,
        apartments_images,
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
        handlers.controlFields({ ...req.body }, req, res, results)
    })
}


export default {
    index,
    show,
    store,
    update,
}


