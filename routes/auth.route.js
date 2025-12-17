const express = require('express')
const {REGISTER, LOGIN} = require("../controllers/auth.controller.js")

const route = express.Router()
route.post('/register', REGISTER)
route.post('/login', LOGIN)

module.exports = route