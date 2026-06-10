// server/src/controllers/search.controller.js
const Hotel = require('../models/Hotel.model')
const Restaurant = require('../models/Restaurant.model')
const Attraction = require('../models/Attraction.model')
const { success } = require('../utils/response')
const asyncHandler = require('../utils/asyncHandler')

// Helper for Pagination & Sorting
const getPaginationAndSort = (query) => {
  const page = parseInt(query.page, 10) || 1
  const limit = parseInt(query.limit, 10) || 10
  const skip = (page - 1) * limit

  let sort = { averageRating: -1 } // Default sort
  if (query.sort) {
    const sortField = query.sort.startsWith('-') ? query.sort.substring(1) : query.sort
    const sortOrder = query.sort.startsWith('-') ? -1 : 1
    sort = { [sortField]: sortOrder }
  }

  return { limit, skip, sort, page }
}

exports.searchHotels = asyncHandler(async (req, res) => {
  const { search, city, minStar, minPrice, maxPrice } = req.query
  const { limit, skip, sort, page } = getPaginationAndSort(req.query)

  const match = {}
  if (search) match.$text = { $search: search }
  if (city) match.city = new RegExp(`^${city}$`, 'i')
  if (minStar) match.starRating = { $gte: Number(minStar) }
  if (minPrice || maxPrice) {
    match.priceLevel = {}
    if (minPrice) match.priceLevel.$gte = Number(minPrice)
    if (maxPrice) match.priceLevel.$lte = Number(maxPrice)
  }

  const [data, total] = await Promise.all([
    Hotel.find(match).sort(sort).skip(skip).limit(limit).lean(),
    Hotel.countDocuments(match)
  ])

  success(res, { data, total, page, pages: Math.ceil(total / limit) })
})

exports.searchRestaurants = asyncHandler(async (req, res) => {
  const { search, city, cuisine, diet, minPrice, maxPrice } = req.query
  const { limit, skip, sort, page } = getPaginationAndSort(req.query)

  const match = {}
  if (search) match.$text = { $search: search }
  if (city) match.city = new RegExp(`^${city}$`, 'i')
  if (cuisine) match.cuisines = new RegExp(`^${cuisine}$`, 'i')
  if (diet) match.dietaryOptions = new RegExp(`^${diet}$`, 'i')
  if (minPrice || maxPrice) {
    match.priceLevel = {}
    if (minPrice) match.priceLevel.$gte = Number(minPrice)
    if (maxPrice) match.priceLevel.$lte = Number(maxPrice)
  }

  const [data, total] = await Promise.all([
    Restaurant.find(match).sort(sort).skip(skip).limit(limit).lean(),
    Restaurant.countDocuments(match)
  ])

  success(res, { data, total, page, pages: Math.ceil(total / limit) })
})

exports.searchAttractions = asyncHandler(async (req, res) => {
  const { search, city, category } = req.query
  const { limit, skip, sort, page } = getPaginationAndSort(req.query)

  const match = {}
  if (search) match.$text = { $search: search }
  if (city) match.city = new RegExp(`^${city}$`, 'i')
  if (category) match.category = new RegExp(`^${category}$`, 'i')

  const [data, total] = await Promise.all([
    Attraction.find(match).sort(sort).skip(skip).limit(limit).lean(),
    Attraction.countDocuments(match)
  ])

  success(res, { data, total, page, pages: Math.ceil(total / limit) })
})

exports.searchCityOverview = asyncHandler(async (req, res) => {
  const { city } = req.params
  const match = { city: new RegExp(`^${city}$`, 'i') }

  // Fetch top 5 of each concurrently
  const [hotels, restaurants, attractions] = await Promise.all([
    Hotel.find(match).sort({ averageRating: -1 }).limit(5).lean(),
    Restaurant.find(match).sort({ averageRating: -1 }).limit(5).lean(),
    Attraction.find(match).sort({ averageRating: -1 }).limit(5).lean()
  ])

  success(res, { city, hotels, restaurants, attractions })
})
