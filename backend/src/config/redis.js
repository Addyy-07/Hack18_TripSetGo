// server/src/config/redis.js
const logger = require('../utils/logger')
const NodeCache = require('node-cache')

let redisClient = null
let useMemoryFallback = true
const localCache = new NodeCache({ stdTTL: 600 }) // 10 min default TTL

if (process.env.REDIS_URL) {
  try {
    const Redis = require('ioredis')
    redisClient = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      connectTimeout: 2000
    })

    redisClient.on('connect', () => {
      logger.info('🚀 Connected to Redis successfully')
      useMemoryFallback = false
    })

    redisClient.on('error', (err) => {
      logger.warn('⚠️ Redis connection error, falling back to In-Memory cache:', err.message)
      useMemoryFallback = true
    })
  } catch (err) {
    logger.warn('⚠️ ioredis package not available. Using In-Memory cache.')
    useMemoryFallback = true
  }
} else {
  logger.info('ℹ️ REDIS_URL not set. Running with In-Memory Cache Store.')
}

const blacklistToken = async (jti, expireSeconds) => {
  if (useMemoryFallback) {
    localCache.set(`blacklist:${jti}`, true, expireSeconds)
  } else {
    try {
      await redisClient.setex(`blacklist:${jti}`, expireSeconds, 'true')
    } catch (err) {
      localCache.set(`blacklist:${jti}`, true, expireSeconds)
    }
  }
}

const isTokenBlacklisted = async (jti) => {
  if (useMemoryFallback) {
    return !!localCache.get(`blacklist:${jti}`)
  } else {
    try {
      const val = await redisClient.get(`blacklist:${jti}`)
      return val === 'true'
    } catch (err) {
      return !!localCache.get(`blacklist:${jti}`)
    }
  }
}

module.exports = {
  blacklistToken,
  isTokenBlacklisted
}
