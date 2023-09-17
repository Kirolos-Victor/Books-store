const express = require('express')
const {
  getAllAuthors,
  getAuthorById,
  storeAuthors,
  updateAuthor,
  deleteAuthor
} = require('../controllers/AuthorController')
const router = express.Router()
const upload = require('../services/UploadAuthorImage')

router.route('/')
  .get(getAllAuthors)
  .post( upload.single('image'), storeAuthors)
router.route('/:id')
  .get(getAuthorById)
  .put(upload.single('image'), updateAuthor)
  .delete(deleteAuthor)

module.exports = router