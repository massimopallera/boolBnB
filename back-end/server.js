// imports
import express from "express"
import router from "./routes/routes.js"
import logger from "./middleware/logger.js"


const server = express()

server.use(express.json())


const HOST = process.env.HOST || "http://localhost"
const PORT = process.env.PORT || 3000

// start server listening 
server.listen(PORT, () => {
    console.log(`Listening on ${HOST}:${PORT}`)
})


// middleware
server.use('/', logger)

server.use('/', router)