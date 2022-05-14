const express = require('express')
const BookingCtrl = require('../controllers/booking')

const router = new express.Router()

// GET ALL PERSONS
router.get('/booking/', BookingCtrl.getAllBookings),
router.post('/booking/', BookingCtrl.createBooking),
// ADD ADDRESS
router.get('/booking/:id/',  BookingCtrl.getBookingById),






    module.exports = router