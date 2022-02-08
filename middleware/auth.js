if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')
  // Check existance of auth header
  if (!authHeader) {
    req.auth = false
    return next()
  }
  const token = authHeader.split(' ')[1]
  // Check if token doesn't exist
  if (!token || token === '') {
    req.auth = false
    return next()
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    if (req.user) {
      req.auth = true
    }
    console.log(req.user)
    next()
  } catch (err) {
    req.auth = false
    throw err
  }
}
