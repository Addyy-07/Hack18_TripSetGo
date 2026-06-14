// server/src/middleware/csrf.middleware.js
const crypto = require('crypto')

const csrfProtection = (req, res, next) => {
  // Safe methods do not require CSRF checks
  const safeMethods = ['GET', 'HEAD', 'OPTIONS']
  if (safeMethods.includes(req.method)) {
    return next()
  }

  const csrfCookie = req.cookies?.csrfToken
  const csrfHeader = req.headers['x-csrf-token']

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return res.status(403).json({
      success: false,
      message: 'CSRF token validation failed'
    })
  }

  next()
}

const setCsrfToken = (req, res, next) => {
  // Generate token if it doesn't exist yet in cookies
  if (!req.cookies?.csrfToken) {
    const token = crypto.randomBytes(24).toString('hex')
    res.cookie('csrfToken', token, {
      httpOnly: false, // Accessible by frontend JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
  }
  next()
}

module.exports = {
  csrfProtection,
  setCsrfToken
}
