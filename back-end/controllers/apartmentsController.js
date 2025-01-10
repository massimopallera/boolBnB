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
        added_services
    } = req.body;


    if (!description || !rooms || !beds || !toilets || !sq_meters || !address || !reference_mail || !apartment_images) {
        return res.status(400).json({ error: 'Tutti i campi obbligatori devono essere compilai' });
    }


    const sql = `
        INSERT INTO apartments (description, rooms, beds, toilets, sq_meters, address, reference_mail, apartment_images, added_services)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const values = [
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
            console.error('Errore durante linserimento dellappartamento:', err);
            return res.status(500).json({ error: 'Errore durante linserimento dellappartamento' });
        }


        res.status(201).json({
            message: 'Appartamento inserito con successo!',

        });
    });
}


// update an apartment

function update(req, res) { }

const id = req.params.id

const {
    description,
    rooms,
    beds,
    toilets,
    sq_meters,
    address,
    reference_mail,
    apartment_images,
    added_services
} = req.body;

if (!description && !rooms && !beds && !toilets && !sq_meters && !address && !reference_mail && !apartment_images && !added_services) {
    return res.status(400).json({ error: 'Devi almeno modificare un campo' });
}

const sql = "UPDATE Customers
SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
WHERE CustomerID = 1"



// delete an apartment //ma serve?
// function destroy(req, res) {}


export default {
    index,
    show,
    store,
    // update,
    // destroy
}