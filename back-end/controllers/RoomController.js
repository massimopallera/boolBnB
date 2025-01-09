import connection from '../Database/connection.js'

function index(req, res) {

    const sql = 'SELECT * FROM appartamenti'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        return res.json(results);
    })
}

function show(req, res) {

    const id = req.params.id
    const sql = 'SELECT * FROM appartamenti WHERE id =?'


    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) {
            return res.status(404).json({ err: 'Apartment not found' })
        }

        res.json({ apartment: results })

    })



}

function store(req, res) {

    const Appartamento = {
        id: req.body.id,
        descrizione_breve: req.body.descrizione_breve,
        nr_stanze: req.body.nr_stanze,
        nr_letti: req.body.nr_letti,
        nr_bagni: req.body.nr_bagni,
        mt_quadri: req.body.quadri,
        indirizzo_completo: req.body.id,
        email_riferimento: req.body.email_riferimento,
        img_appartamento: req.body.img_appartamento,
        servizi_aggiuntivi: req.body.servizi_aggiuntivi,
        counter_cuori: req.body.counter_cuori
    }


}

function update(req, res) {}

function destroy(req, res) {}


export default {
    index, 
    show,
    store,
    update,
    destroy
}