const express = require('express')
const {
	CREATE_BOOK,
	UPDATE_BOOK,
	GET_BOOKS,
	GET_BY_ID,
	DELETE_BOOK,
	ORDER_BOOK,
	RETURN_BOOK,
} = require('../controllers/books.controller.js')
const { checkToken } = require('../middlewares/auth.middleware.js')

const route = express.Router()

route.post('/book', checkToken, CREATE_BOOK)
route.get('/book', checkToken, GET_BOOKS)
route.get('/book/:id', checkToken, GET_BY_ID)
route.put('/book', checkToken, UPDATE_BOOK)
route.delete('/book', checkToken, DELETE_BOOK)
route.get('/book/order/:id', checkToken, ORDER_BOOK)
route.get('/book/return/:id', checkToken, RETURN_BOOK)

module.exports = route
