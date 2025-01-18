import pool from '../database/pool.js'
const index = (req, res) => {
    const sql = `SELECT * FROM categories`

    pool.query(sql, (err,results) => {
        if (err) return res.status(500).json({message: 'errore'})
        res.status(200).json({results})
    })
}

export default {
    index
}