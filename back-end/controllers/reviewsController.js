import connection from "../database/connection.js";


function index(req,res){
    const sql = `SELECT * FROM reviews`

    connection.query(sql, (err,results) => {
        if (err) return res.status(500).json({err: err.message})
        return res.status(200).json(results)
    })
}


function show(req,res){

    const id = req.params.id
    const sql = `SELECT * FROM reviews WHERE id = ?`

    connection.query(sql,[id], (err,results) => {
        if (err) return res.status(500).json({err: err.message})
        if (results.length === 0) return res.status(404).json({err:'not found'})
        res.status(200).json(results)
    })
}

// function store(req,res){}
// function update(){}
// function destroy(){}

export default {
    index,
    show
    // store
    // update
    // destroy
}