const jwt = require('jsonwebtoken')
const Restaurant = require('../models/restaurant')
const config = require('../config')

const auth = async(req, res, next) => {
    try {
        // Not expiration time
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.JWT_SECRET)
        const restaurant = await Restaurant.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!restaurant) {
            throw new Error()
        }

        req.token = token
        req.restaurant = restaurant
        next()
    } catch (e) {
        res.status(401).send({ error: 'Inicia sesión para continuar.' })
    }
}

module.exports = auth