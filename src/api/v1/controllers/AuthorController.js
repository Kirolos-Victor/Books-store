const asyncHandler = require('express-async-handler')
const { Author } = require('../models/Author')
const { validateCreateAuthor, validateUpdateAuthor } = require('../validations/Author')
const { handleResponse, handleError } = require('../helpers/JsonResponse')
const fs = require('fs')

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */
const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find()
  return handleResponse(res, 200, authors)
})

/**
 * @desc Get an author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id)
  if (!author) return handleError(res, 422, 'Author not found')

  return handleResponse(res, 200, author)

})

/**
 * @desc Store an author
 * @route /api/authors
 * @method POST
 * @access public
 */
const storeAuthors = asyncHandler(async (req, res) => {
  req.body.image = req.file
  const { error, value } = validateCreateAuthor(req.body)

  if (error) return handleError(res, 422, error.details)

  value.image = req.file.filename
  const author = new Author(value)
  const result = await author.save()
  return handleResponse(res, 201, result)
})

/**
 * @desc update an author by id
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */
const updateAuthor = asyncHandler(async (req, res) => {
  const { error, value } = validateUpdateAuthor(req.body)
  if (error) return handleError(res, 422, error.details)

  const author = await Author.findById(req.params.id)
  if (!author) return handleError(res, 422, 'Author not found')

  if (req.file) {
    await fs.unlink(`src/images/authors/${author.image}`, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`)
      }
    })
    value.image = req.file.filename
  }
  const updatedAuthor = await Author.findOneAndUpdate({ _id: req.params.id }, value, { new: true })
  return handleResponse(res, 200, updatedAuthor)
})

/**
 * @desc Delete an author by id
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id)
  if (!author) return handleError(res, 422, 'Author not found')

  return handleResponse(res, 200, author)
})

module.exports = {
  getAllAuthors,
  getAuthorById,
  storeAuthors,
  updateAuthor,
  deleteAuthor
}