const { verifyAccessToken } = require('../utils/jwt')
const { unauthorized, forbidden } = require('../utils/response')
const User                  = require('../models/User.model')
const { isTokenBlacklisted } = require('../config/redis')

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) return unauthorized(res)

    const token = authHeader.split(' ')[1]
    const decoded = verifyAccessToken(token)

    // Check if token is blacklisted
    const blacklisted = await isTokenBlacklisted(decoded.jti)
    if (blacklisted) return unauthorized(res, 'Token has been revoked')

    const user = await User.findById(decoded.userId).select('-passwordHash')
    if (!user) return unauthorized(res, 'User not found')
    if (user.status !== 'active') return unauthorized(res, 'Account is suspended or deleted')

    req.user = user
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') return unauthorized(res, 'Token expired')
    return unauthorized(res, 'Invalid token')
  }
}

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader?.startsWith('Bearer ')) {
      const token   = authHeader.split(' ')[1]
      const decoded = verifyAccessToken(token)
      req.user = await User.findById(decoded.userId).select('-passwordHash')
    }
    next()
  } catch {
    next()
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return unauthorized(res, 'User authentication required')
    if (!roles.includes(req.user.role)) {
      return forbidden(res, 'Access denied: insufficient permissions')
    }
    next()
  }
}

module.exports = { authenticate, optionalAuth, authorize }
