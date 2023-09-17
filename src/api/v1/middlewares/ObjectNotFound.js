function objectNotFound (err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  return res.status(statusCode).json({ error: err.message })
}

module.exports = objectNotFound