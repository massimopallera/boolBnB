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

// Control fields of a form. If a key is not specified it'll give 400, unless it's 'added_services' that could be empty
const controlFields = (data, req, res, results) => {
    for (const key in data) {
        if (!data[key] && [key] != 'added_services') {
            return res.status(400).json({ message: 'All fields are required' })
        }
    }

    return statusCode(req, res, results); // If all fields are filled, return a function thath handle status codes
}

// Handle most status codes 
const statusCode = (req, res, results) => {

    // control if there is a new id inserted. If there is it'll mean there is a new row
    if (results?.affectedRows > 0 && results?.insertId != 0) {
        return res.status(201).json({ statusCode: 201, status: "Created", data: '' }); //created new element

    }

    else if (results.affectedRows > 0 && results.insertId === 0) {

        if (req.method === 'POST') {
            //Already exists in db
            return res.status(409).json({ statusCode: 409, status: "Conflict", data: '' });
        }

        // Update the password (just for change the password)
        if (req.method === 'PUT' && req.originalUrl.includes('changePassword')) {
            // In case a user update the password, it will be logged out automatically
            auth.logout(req, res)

            return res.status(200).json({ messsage: 'password aggiornata' })
        }

        // Update
        return res.status(204).json({ statusCode: 204, status: "No Content", data: '' });
    }

    if (results[0]) {

        //if the original url is /login, it will return just a boolean, the response is in its own file
        if (req.originalUrl === '/login') {
            return true
        }

        //else it will return OK response
        return res.status(200).json({ statusCode: 200, status: "OK", data: results })
    }

    //Not Found
    if (!results[0]) {
        //if the original url is /login, it will return just a boolean, the response is in its own file
        if (req.originalUrl === '/login') {
            return false
        }

        //else it will return NOT FOUND response
        return res.status(404).json({ statusCode: 404, status: "Not Found", data: '' });
    }

}


// Not Found for URLs
const NotFound = (req, res, next) => {
    res.status(404).json({ status: 404, result: 'Page Not Found' })
    next()
}

export default {
    statusCode,
    controlFields,
    NotFound
}