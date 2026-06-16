// server/src/middleware/cache.middleware.js
// ─────────────────────────────────────────────────────────────────────────────
// Redis-backed HTTP response cache middleware factory.
//
// Usage:
//   const { cacheMiddleware } = require('./cache.middleware')
//   router.get('/hotels', cacheMiddleware('hotels'), searchCtrl.searchHotels)
//   router.get('/trending', cacheMiddleware('destinations:trending', 600), ...)
//
// How it works:
//   1. On GET request → build key from namespace + SHA-256(req.originalUrl)
//   2. HIT  → return cached response + set X-Cache: HIT header
//   3. MISS → let handler run, intercept res.json(), store successful response
// ─────────────────────────────────────────────────────────────────────────────
const cacheService = require('../services/cache.service')
const logger       = require('../utils/logger')

/**
 * Create a cache middleware for a specific namespace and optional TTL.
 *
 * @param {string} namespace   Namespace prefix (e.g. 'hotels', 'destinations:trending')
 * @param {number} [ttl]       TTL override in seconds. Falls back to namespace registry.
 * @returns {Function}         Express middleware
 */
const cacheMiddleware = (namespace, ttl) => async (req, res, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') return next()

  const key = cacheService.buildKey(namespace, req.originalUrl)

  try {
    const cached = await cacheService.get(key)

    if (cached) {
      logger.info(`[Cache] HIT  ${namespace} — ${req.originalUrl}`)
      res.setHeader('X-Cache', 'HIT')
      res.setHeader('X-Cache-Namespace', namespace)
      return res.status(200).json(cached)
    }

    logger.info(`[Cache] MISS ${namespace} — ${req.originalUrl}`)
    res.setHeader('X-Cache', 'MISS')
    res.setHeader('X-Cache-Namespace', namespace)

    // Intercept res.json to cache the response body before sending
    const originalJson = res.json.bind(res)
    res.json = async (body) => {
      // Only cache successful, non-error responses
      if (res.statusCode >= 200 && res.statusCode < 300 && body?.success !== false) {
        try {
          const effectiveTTL = ttl ?? cacheService.resolveTTL(namespace)
          const redis = require('../config/redis')
          await redis.cacheSet(key, body, effectiveTTL)
        } catch (err) {
          logger.warn(`[Cache] Failed to store response for "${key}": ${err.message}`)
        }
      }
      return originalJson(body)
    }
  } catch (err) {
    // Cache failure must never break the request
    logger.warn(`[Cache] Middleware error for "${key}": ${err.message}`)
  }

  next()
}

module.exports = cacheMiddleware
