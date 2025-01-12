import connection from "../database/connection.js";
import handlers from "../middleware/handlers.js";

// get all elements from reviews
function index(req, res) {
    const sql = `SELECT * FROM reviews`

    connection.query(sql, (err, results) => {
        handlers.statusCode(req, res, results)
    })
}

// get a single review
function show(req, res) {

    const id = req.params.id
    const sql = `SELECT * FROM reviews WHERE id = ?`

    connection.query(sql, [id], (err, results) => {
        handlers.statusCode(req, res, results)
    })
}

function store(req, res) {
    const newReview = { ...req.body }


    const sql = `
    INSERT INTO reviews
    (id_apartment_fk, name, text, data, days_of_stay)
    VALUES (?,?,?,?,?)
    `

    //control if body request is correct

    connection.query(sql, Object.values(newReview), (err, results) => {
         handlers.controlFields(newReview, req, res, results)
    })
}

export default {
    index,
    show,
    store
    // update
    // destroy
}