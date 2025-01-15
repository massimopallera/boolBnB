import connection from '../database/connection.js'
import handlers from '../middleware/handlers.js'
import verifyToken from '../auth/verify.js'

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
    
    const token = req.cookies.jwt
    if (token) {
        const decoded = verifyToken(token)
        const id_user = decoded.id

        // (SELECT COUNT(*) FROM reviews WHERE reviews.apartment_id = ap.id) AS reviews_counter

        const sql = `
        SELECT ap.*, users.email AS email
        FROM apartments AS ap
        INNER JOIN users ON users.id = ap.id_user
        WHERE ap.id_user = ?
        ORDER BY id DESC
        `

        connection.query(sql, [id_user], (err, results) => {
            handlers.statusCode(req, res, results)
            // if (err) return res.status(500).json({message: err.message})
            // res.status(200).json(results)
        })
    } else res.status(404).json({message: 'nuh uh'})
    
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


