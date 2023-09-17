const asyncHandler = require('express-async-handler')
const { Book } = require('../models/Book')
const { validateCreateBook, validateUpdateBook } = require('../validations/Book')
const { handleResponse, handleError } = require('../helpers/JsonResponse')

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
const getAllBooks = asyncHandler(async (req, res, next) => {
  const { page } = req.query
  const booksPerPage = 2
  const books = await Book.find(filterBooks(req.query))
    .populate('author')
    .sort({ price: -1 })
    .skip((page - 1) * booksPerPage)
    .limit(booksPerPage)
  return handleResponse(res, 200, books)
})

/**
 * @desc Get one book
 * @route /api/books/:id
 * @method GET
 * @access public
 */
const getBookById = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id,)
  if (!book) return handleError(res, 422, 'Book not found')

  return handleResponse(res, 200, book)
})

/**
 * @desc create a new book
 * @route /api/books
 * @method POST
 * @access public
 */
const storeBooks = asyncHandler(async (req, res, next) => {
  const { error, value } = validateCreateBook(req.body)
  if (error) return handleError(res, 422, error.details)

  const book = new Book(value)
  const result = await book.save()
  return handleResponse(res, 200, result)
})

/**
 * @desc Update a book by id
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
const updateBook = asyncHandler(async (req, res) => {
  const { error, values } = validateUpdateBook(req.body)
  if (error) return handleError(res, 422, error.details)

  const book = await Book.findByIdAndUpdate(req.params.id, values, { new: true })
  if (!book) return handleError(res, 422, 'Book not found')

  return handleResponse(res, 200, book)

})

/**
 * @desc Delete a book by id
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id)
  if (!book) return handleError(res, 422, 'Book not found')

  return handleResponse(res, 200, book)

})
/**
 * @desc Filter books
 * @access public
 */
function filterBooks (query) {
  const { minPrice, maxPrice } = query
  const filter = {}

  if (minPrice) filter.price = { $gte: minPrice }

  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice }
  return filter
}

module.exports = {
  getAllBooks,
  getBookById,
  storeBooks,
  updateBook,
  deleteBook
}