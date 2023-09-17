const express = require('express')
const { getAllBooks, getBookById, storeBooks, updateBook, deleteBook } = require('../controllers/BookController')
const router = express.Router()

router.route('/')
  .get(getAllBooks)
  .post(storeBooks)
router.route('/:id')
  .get(getBookById)
  .put(updateBook)
  .delete(updateBook)

module.exports = router