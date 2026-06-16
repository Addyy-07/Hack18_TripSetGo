// server/src/routes/discover.routes.js
const router      = require('express').Router()
const discoverCtrl = require('../controllers/discover.controller')
const { optionalAuth } = require('../middleware/auth.middleware')
const cache       = require('../middleware/cache.middleware')

// /feed     → 5 min TTL  (user-personalised via optionalAuth; cache after auth resolve)
// /search   → no cache   (highly dynamic, user query-driven)
// /trending → 10 min TTL (expensive aggregation query)

router.get('/feed',     optionalAuth, cache('destinations:feed'),     discoverCtrl.getFeed)
router.get('/search',   optionalAuth,                                  discoverCtrl.search)
router.get('/trending', cache('destinations:trending'),                discoverCtrl.getTrending)

module.exports = router
