import express from "express"
import router from "./routes/routes.js"


const server = express()

server.use(express.json())


const HOST = process.env.HOST || "http://localhost"
const PORT = process.env.PORT || 3000

// start server listening 
server.listen(PORT, () => {
    console.log(`Listening on ${HOST}:${PORT}`)
})

server.use('/', router)

// server.get('/', (req, res) => {res.json('ciao')})