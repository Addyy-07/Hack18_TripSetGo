// server/src/routes/cache.routes.js
// ─────────────────────────────────────────────────────────────────────────────
// Admin endpoints for cache observability and manual invalidation.
//
//   GET    /api/v1/cache/stats              → hit/miss/error counters + backend info
//   DELETE /api/v1/cache/flush/:namespace   → flush all keys in a namespace
//   DELETE /api/v1/cache/reset-stats        → reset counters
// ─────────────────────────────────────────────────────────────────────────────
const router       = require('express').Router()
const cacheService = require('../services/cache.service')
const { authenticate } = require('../middleware/auth.middleware')
const logger       = require('../utils/logger')

// Valid namespaces that can be flushed via API
const VALID_NAMESPACES = [
  'hotels',
  'restaurants',
  'attractions',
  'destinations:trending',
  'destinations:feed',
  'search:city',
  'search:nearby',
  'itinerary',
]

/**
 * GET /api/v1/cache/stats
 * Returns cache hit/miss/error statistics and backend info.
 * Protected: requires authentication.
 */
router.get('/stats', authenticate, (req, res) => {
  const stats = cacheService.getStats()
  const hitRate = stats.hits + stats.misses > 0
    ? ((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(1)
    : '0.0'

  res.status(200).json({
    success: true,
    data: {
      ...stats,
      hitRate: `${hitRate}%`,
      namespaces: VALID_NAMESPACES,
      ttlRegistry: cacheService.TTL,
    }
  })
})

/**
 * DELETE /api/v1/cache/flush/:namespace
 * Flush all cached keys under a given namespace.
 * Protected: requires authentication.
 *
 * Special namespace "all" flushes every registered namespace.
 */
router.delete('/flush/:namespace', authenticate, async (req, res) => {
  const { namespace } = req.params

  if (namespace === 'all') {
    await cacheService.flushMany(...VALID_NAMESPACES)
    logger.info(`[Cache] Admin flushed ALL namespaces by user ${req.user._id}`)
    return res.status(200).json({ success: true, message: 'All cache namespaces flushed' })
  }

  if (!VALID_NAMESPACES.includes(namespace)) {
    return res.status(400).json({
      success: false,
      message: `Invalid namespace. Valid options: ${VALID_NAMESPACES.join(', ')}, all`
    })
  }

  await cacheService.flush(namespace)
  logger.info(`[Cache] Admin flushed namespace "${namespace}" by user ${req.user._id}`)

  res.status(200).json({
    success: true,
    message: `Cache namespace "${namespace}" flushed successfully`
  })
})

/**
 * DELETE /api/v1/cache/reset-stats
 * Reset hit/miss/error counters.
 * Protected: requires authentication.
 */
router.delete('/reset-stats', authenticate, (req, res) => {
  cacheService.resetStats()
  logger.info(`[Cache] Stats reset by user ${req.user._id}`)
  res.status(200).json({ success: true, message: 'Cache statistics reset' })
})

module.exports = router
