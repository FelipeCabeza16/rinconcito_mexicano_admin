const express = require('express')
const router = new express.Router()

const AuthCtrl = require('../middleware/auth')
const FirstCapitalLetterCtrl = require('../middleware/format_first_capital_letters')

const RestaurantCtrl = require('../controllers/restaurant')


router.get('/restaurant/:id', AuthCtrl, RestaurantCtrl.findById),

router.post('/restaurant/register', FirstCapitalLetterCtrl, RestaurantCtrl.register),
router.post('/restaurant/login', RestaurantCtrl.login),
router.get('/restaurant/find_by_document/:document', RestaurantCtrl.findByDocument),

router.get('/restaurant/update_token', AuthCtrl, RestaurantCtrl.updateToken),
router.get('/restaurant/logout', AuthCtrl, RestaurantCtrl.logout),

router.get('/restaurant/me', AuthCtrl, RestaurantCtrl.myProfile),
router.patch('/restaurant/me', [AuthCtrl, FirstCapitalLetterCtrl], RestaurantCtrl.updateProfile),
router.delete('/restaurant/me', AuthCtrl, RestaurantCtrl.delete),


router.post('/restaurant/find_phone', RestaurantCtrl.findByPhone),
router.post('/restaurant/get_user_without_save_token_by_document', RestaurantCtrl.findByDocument),
router.post('/restaurant/get_user_without_save_token_by_phone', RestaurantCtrl.findByPhone),
router.post('/restaurant/get_user_without_save_token_by_email', RestaurantCtrl.findByEmail),




module.exports = router