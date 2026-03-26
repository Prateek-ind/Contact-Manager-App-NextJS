const express = require("express")
const cors = require("cors")
const contactRoutes = require("./routes/contacts.routes")
const authRoutes = require("./routes/auth.routes")

const app = express()
app.use(express.json())
app.use(cors())
app.use('/auth', authRoutes)


app.use('/contacts', contactRoutes)

module.exports = app