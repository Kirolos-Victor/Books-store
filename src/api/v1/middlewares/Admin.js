const { handleError } = require('../helpers/JsonResponse')

function admin (req, res, next) {
  if (!req.user.isAdmin) return handleError(res, 403, 'Access Denied')
  next()
}

module.exports = admin