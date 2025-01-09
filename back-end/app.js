import express from "express"
const app = express()

app.use(express.json())

const HOST = process.env.HOST || "http://localhost"
const PORT = process.env.PORT || 3000

// start server listening 
app.listen(PORT, () => {
    console.log(`Listening on ${HOST}:${PORT}`)
})

// app.get('/', (req, res) => {res.send('ciao')})