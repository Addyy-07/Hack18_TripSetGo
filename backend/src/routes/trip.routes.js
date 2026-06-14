// server/src/routes/trip.routes.js
const router    = require('express').Router()
const rateLimit = require('express-rate-limit')
const tripCtrl  = require('../controllers/trip.controller')
const { authenticate, optionalAuth } = require('../middleware/auth.middleware')
const validate  = require('../middleware/validate.middleware')
const { createTripSchema, saveItinerarySchema, itineraryDaySchema } = require('../validators/trip.validator')

const tripCreationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: { success: false, message: 'Too many trip generation requests. Please try again after an hour.' }
})

// Core trip CRUD
router.post('/',              authenticate, tripCreationLimiter, validate(createTripSchema), tripCtrl.createTrip)
router.get('/my-trips',       authenticate, tripCtrl.getMyTrips)
router.get('/collaborations',  authenticate, tripCtrl.getSharedTrips)
router.get('/:id',            optionalAuth, tripCtrl.getTrip)
router.put('/:id',            authenticate, tripCtrl.updateTrip)
router.delete('/:id',         authenticate, tripCtrl.deleteTrip)

// Collaboration management
router.post('/:id/collaborators',           authenticate, tripCtrl.inviteCollaborator)
router.post('/:id/collaborators/respond',   authenticate, tripCtrl.respondToInvitation)
router.delete('/:id/collaborators/:userId', authenticate, tripCtrl.removeCollaborator)

// Social features
router.post('/:id/like',      authenticate, tripCtrl.likeTrip)
router.post('/:id/save',      authenticate, tripCtrl.saveTrip)
router.post('/:id/comment',   authenticate, tripCtrl.addComment)
router.post('/:id/clone',     authenticate, tripCtrl.cloneTrip)

// Share trip (generate public URL)
router.post('/:id/share',     authenticate, tripCtrl.shareTrip)

// Itinerary management
router.put('/:id/itinerary',            authenticate, validate(saveItinerarySchema), tripCtrl.saveItinerary)
router.post('/:id/itinerary/day',       authenticate, validate(itineraryDaySchema),  tripCtrl.addItineraryDay)
router.put('/:id/itinerary/day/:day',   authenticate, tripCtrl.updateItineraryDay)
router.delete('/:id/itinerary/day/:day',authenticate, tripCtrl.deleteItineraryDay)

module.exports = router
