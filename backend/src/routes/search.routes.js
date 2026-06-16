// server/src/routes/search.routes.js
const router      = require('express').Router()
const searchCtrl  = require('../controllers/search.controller')
const cache       = require('../middleware/cache.middleware')

// Per-endpoint caching with namespace-specific TTLs:
//   hotels, restaurants, attractions → 30 min (data rarely changes)
//   city overview                    → 15 min
//   nearby                           → 10 min (geo-sensitive)

router.get('/hotels',       cache('hotels'),        searchCtrl.searchHotels)
router.get('/restaurants',  cache('restaurants'),   searchCtrl.searchRestaurants)
router.get('/attractions',  cache('attractions'),   searchCtrl.searchAttractions)
router.get('/nearby',       cache('search:nearby'), searchCtrl.searchNearby)
router.get('/city/:city',   cache('search:city'),   searchCtrl.searchCityOverview)

module.exports = router
