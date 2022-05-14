const express = require('express')
const AuthCtrl = require('../middleware/auth')
const TableCtrl = require('../controllers/table')

const router = new express.Router()

// CREATE A LIST OF TABLES AND PUSH TO THE ESTABLISHMENT
router.get('/table/create/:tableQuantity', AuthCtrl, TableCtrl.createRestaurantTables),
// GET ALL ESTABLISHMENT TABLES
router.get('/table/me', AuthCtrl, TableCtrl.getRestaurantTables),
// ADD TABLE
router.get('/table/add', AuthCtrl, TableCtrl.addTable),
// 4 possible states for a table
router.get('/table/available/:id', AuthCtrl, TableCtrl.switchTableAvailable),
router.get('/table/notAvailable/:id', AuthCtrl, TableCtrl.switchTableNotAvailable),
router.get('/table/occupy/:id', AuthCtrl, TableCtrl.switchTableOccupy),
router.get('/table/booking/:id', AuthCtrl, TableCtrl.switchTableBooking),

router.delete('/table/:id/', AuthCtrl, TableCtrl.deleteTableByID),



// GET TABLE BY ID
router.get('/table/:id/', TableCtrl.getTableByID),
// GET TABLE STATUS
router.get('/table/status/:id/', TableCtrl.getTableStatusByID),



    module.exports = router