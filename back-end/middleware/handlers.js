/* 
    Creare handler per codici di stato

    200 OK 
    201 CREATED
    204 NO CONTENT

    400 BAD REQUEST
    401 NOT AUTHORIZED
    404 NOT FOUND
    403 FORBIDDEN

*/

const handler = (req,res,results) => {
    
    if(results.affectedRows > 0){
        return res.status(201).json({status: 201, result: results});
    }
    if(!results[0]){
        return res.status(404).json({status: 404, result: 'Not Found'});
    }
    if(results.length > 0){
        return res.status(200).json({status:200, data: results})
    }


    // next()
}


const NotFound = (req,res,next) => {
    res.status(404).json({status: 404, result: 'Not Found'})
    next()
}

export default { 
    handler, 
    NotFound 
}