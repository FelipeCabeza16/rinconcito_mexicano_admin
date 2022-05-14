const express = require('express')
const ClientCtrl = require('../controllers/client')

const router = new express.Router()

// GET ALL PERSONS
router.get('/client/', ClientCtrl.getAllClients),
router.post('/client/', ClientCtrl.createClient),
// ADD ADDRESS
router.get('/client/:id/',  ClientCtrl.getClientById),






    module.exports = router