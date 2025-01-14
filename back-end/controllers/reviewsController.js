import connection from "../database/connection.js";
import handlers from "../middleware/handlers.js";
import dayjs from 'dayjs';
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
    const sql = `
        SELECT name, text, date, days_of_stay
        FROM reviews
        WHERE id_apartment_fk = 1`

    connection.query(sql, [id], (err, results) => {
        handlers.statusCode(req, res, results)
    })
}

function store(req, res) {
    const { name, text, id_apartment_fk, days_of_stay } = req.body
    
    const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    // console.log(req.body, formattedDate);  

    

    const sql = `
    INSERT INTO reviews
    (id_apartment_fk, name, text, date, days_of_stay)
    VALUES (?,?,?,?,?);
    `

    //control if body request is correct

    connection.query(sql, [
        id_apartment_fk,
        name,
        text,
        formattedDate,
        days_of_stay
    ], (err, results) => {
        // handlers.controlFields({...req.body, formattedDate}, res, results)
        if(err){
            return res.status(500).json({message : 'Intrernal error'})
        }
        
        return res.status(201).json({message: 'Review Inserita', results})

    })
}

export default {
    index,
    show,
    store
    // update
    // destroy
}