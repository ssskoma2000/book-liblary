const express = require('express')
const db = require('./config/database.js')
const authRoute = require("./routes/auth.route.js")
const bookRoute = require("./routes/books.route.js")
const app = express()
app.use(express.json())


async function start() {
    await db()

    app.use("/auth", authRoute)
    app.use(bookRoute)


    app.listen(3000, () => console.log("http://localhost:3000"))
}
start()