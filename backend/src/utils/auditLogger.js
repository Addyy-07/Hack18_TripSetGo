// server/src/utils/auditLogger.js
const AuditLog = require('../models/AuditLog.model')
const logger = require('./logger')

const logEvent = async ({ userId = null, action, status = 'success', req = null, details = {} }) => {
  try {
    const ipAddress = req ? (req.ip || req.headers['x-forwarded-for'] || '') : ''
    const userAgent = req ? (req.headers['user-agent'] || '') : ''

    await AuditLog.create({
      userId,
      action,
      status,
      ipAddress,
      userAgent,
      details
    })

    logger.info(`[Audit] Action: ${action} | Status: ${status} | User: ${userId || 'guest'}`)
  } catch (err) {
    logger.error('❌ Failed to write audit log:', err.message)
  }
}

module.exports = {
  logEvent
}
