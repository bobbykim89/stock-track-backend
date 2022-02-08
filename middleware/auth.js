if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')

  // Check if token doesn't exist
  if (!token) {
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
    res.status(401).json({ msg: 'Token is not valid.' })
  }
}
