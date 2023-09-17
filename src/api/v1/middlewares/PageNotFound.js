function pageNotFound (req, res, next) {
  const error = new Error('Page not found')
  res.status(404)
  next(error)
}

module.exports = pageNotFound