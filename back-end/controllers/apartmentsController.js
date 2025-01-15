import pool from '../database/pool.js'
import handlers from '../middleware/handlers.js'
import verifyToken from '../auth/verify.js'

// get all elements from apartments
function index(req, res) {

    const sql = 'SELECT * FROM apartments ORDER BY hearts_counter DESC'

    pool.query(sql, (err, results) => {
        handlers.statusCode(req, res, results)
    })
}

function serviceIndex(req, res) {
    const sql = 'SELECT * FROM added_services'

    pool.query(sql, (err, results) => {
        handlers.statusCode(req, res, results) 
    })
}

// get a single element from apartments
function showOwnerApartments(req, res) {

    // const id = Number(req.params.id)
    
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

        pool.query(sql, [id_user], (err, results) => {
            handlers.statusCode(req, res, results)
            // if (err) return res.status(500).json({message: err.message})
            // res.status(200).json(results)
        })
    } else res.status(404).json({message: 'nuh uh'})
    
}
function show(req, res) {

    const id = Number(req.params.id)

    const sql = `
    SELECT ap.*
    FROM apartments AS ap
    WHERE id = ?
    `

    pool.query(sql, [id], (err, results) => {
        handlers.statusCode(req, res, results)
         
    })    
}

// store an apartment
/* function store(req, res) {

    console.log(req.body)

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

    pool.query(sql, [
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
 */


const store = async (req, res) => {
    let connection;

    try {
        // Ottieni una connessione dal pool
        connection = await pool.promise().getConnection();

        // Decodifica il token JWT e ottieni l'ID utente
        const decoded = verifyToken(req.cookies.jwt);
        const id_user = decoded.id;

        // Estrai i dati dalla richiesta
        const {
            rooms,
            beds,
            toilets,
            sq_meters,
            address,
            apartments_images,
            description,
            added_services
        } = req.body;

        // Inizia una transazione
        await connection.beginTransaction();

        // Query per inserire l'appartamento
        const apartmentQuery = `
            INSERT INTO apartments (id_user, description, rooms, beds, toilets, sq_meters, address, apartments_images)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [apartmentResult] = await connection.query(apartmentQuery, [
            id_user,
            description,
            Number(rooms),
            Number(beds),
            Number(toilets),
            Number(sq_meters),
            address,
            apartments_images
        ]);

        // Ottieni l'ID dell'appartamento appena inserito
        const apartment_id = apartmentResult.insertId;

        // Inserisci i servizi aggiuntivi nella tabella ponte
        const serviceQuery = `
            INSERT INTO \`apartment-added_service\` (apartment_id_fk, added_service_id_fk)
            VALUES (?, ?)
        `;

        for (const id of added_services) {
            await connection.query(serviceQuery, [apartment_id, id]);
        }

        // Conferma la transazione
        await connection.commit();

        // Rispondi al client
        res.status(201).json({ message: 'Appartamento inserito con successo' });

    } catch (error) {
        console.error('Errore durante l\'inserimento:', error);

        // Annulla la transazione in caso di errore
        if (connection) await connection.rollback();

        res.status(500).json({ message: 'Errore durante l\'inserimento', error: error.message });

    } finally {
        // Rilascia la connessione al pool
        if (connection) connection.release();
    }
};

// export default store;
























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
    pool.query(sql, [hearts_counter+1, id], (err, results) => {
        if (err) res.status(500).json({message: 'fdp'})
            show(req,res)
        })
}


export default {
    index,
    show,
    showOwnerApartments,
    store,
    update,
    serviceIndex
}


