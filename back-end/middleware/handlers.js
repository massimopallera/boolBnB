/* 
    Create handlers for these status codes

    200 OK 
    201 CREATED
    204 NO CONTENT

    400 BAD REQUEST
    401 NOT AUTHORIZED
    404 NOT FOUND
    403 FORBIDDEN ??
    409 CONFLICT
*/

const controlFields = (data, req,res, results, err) => {
    for (const key in data) {
        if (!data[key]){
            return res.status(400).json({message: 'All fields are required'})
        }
    }
    
    return statusCode(req,res,results, err);
}

const statusCode = (req,res,results, err) => {

    console.log(results);

    // control if there is a new id inserted. If there is it'll mean there is a new row
    if(results.affectedRows > 0 && results.insertId != 0){ 
        return res.status(201).json({statusCode: 201, status: "Created" , result: results}); //created new element

    }else if (results.affectedRows > 0 && results.insertId === 0){
        if (req.method === 'POST'){
            return res.status(409).json({statusCode: 409, status: "Conflict" , result: results}); //Already exists in db
        }
        return res.status(204).json({statusCode: 204, status: "No Content" , result: results}); //updated element
    }
    if(results[0]){
        return res.status(200).json({statusCode:200, status: "OK" , data: results})
    }
    if(!results[0]){
        return res.status(404).json({statusCode: 404, status: "Not Found" , result: 'Not Found'});
    }

}


const NotFound = (req,res,next) => {
    res.status(404).json({status: 404, result: 'Page Not Found'})
    next()
}

export default { 
    statusCode, 
    controlFields,
    NotFound 
}