import connection from '../database/connection.js'
import handlers from '../middleware/handlers.js'

// get all elements from apartments
function index(req, res) {

    const sql = 'SELECT * FROM apartments ORDER BY hearts_counter DESC'

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
        // if (err) res.status(500).json({message: 'PAOLO BROSIO COCAINOMANE', err: err.message})
        //     else res.json({message: 'ANDREA DIPRE RAPITORE DI ALDO MORO'})
        // res.json({message: err.message})
    });
}


// update an apartment
function update(req, res) {

    const id = Number(req.params.id)

    const {hearts_counter} = req.body

    const sql = `
    UPDATE apartments
    SET
        hearts_counter = ?
    WHERE id = ?
    `
    connection.query(sql, [hearts_counter+1, id], (err, results) => {
        if (err) res.status(500).json({message: 'fdp'})
            show(req,res)
        })
}


export default {
    index,
    show,
    store,
    update,
}


