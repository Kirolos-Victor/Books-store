const jwt = require('jsonwebtoken')

function authenticateToken (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.status(401).json({ error: 'You are not authenticated' })
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token', error: err })
    req.user = user.data
    next()
  })
}

module.exports = authenticateToken