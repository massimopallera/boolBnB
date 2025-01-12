import auth from '../auth/loginLogout.js'
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

const controlFields = (data, req, res, results) => {
    for (const key in data) {
        if (!data[key] && [key] != 'added_services') {
            return res.status(400).json({ message: 'All fields are required' })
        }
    }

    return statusCode(req, res, results);
}

const statusCode = (req, res, results) => {

    // control if there is a new id inserted. If there is it'll mean there is a new row
    if (results.affectedRows > 0 && results.insertId != 0) {
        return res.status(201).json({ statusCode: 201, status: "Created", data: '' }); //created new element

    } else if (results.affectedRows > 0 && results.insertId === 0) {
        if (req.method === 'POST') {
            auth.logout
            return res.status(409).json({ statusCode: 409, status: "Conflict", data: '' }); //Already exists in db
        }
        if (req.method === 'PUT' && req.originalUrl.includes('changePassword')) {
            auth.logout(req,res)
            return res.status(200).json({ messsage: 'password updated' }) //updated password
        }
        return res.status(204).json({ statusCode: 204, status: "No Content", data: '' }); //updated element
    }
    if (results[0]) {
        if(req.originalUrl === '/login'){
            return true
        } 
        return res.status(200).json({ statusCode: 200, status: "OK", data: results })
    }
    if (!results[0]) {
        if(req.originalUrl === '/login'){
            return false
        } 
        return res.status(404).json({ statusCode: 404, status: "Not Found", data: '' });
    }

}


const NotFound = (req, res, next) => {
    res.status(404).json({ status: 404, result: 'Page Not Found' })
    next()
}

export default {
    statusCode,
    controlFields,
    NotFound
}