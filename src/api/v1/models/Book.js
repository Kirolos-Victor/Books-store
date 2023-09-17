const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
}, {
  timestamps: true
})

const Book = mongoose.model('Book', BookSchema)

module.exports = {
  Book
}