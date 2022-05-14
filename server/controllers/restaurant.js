const Restaurant = require('../models/restaurant')
const config = require('../config')
const path = require('path')

exports.register = async(req, res) => {
    
    try {        
        const restaurant = new Restaurant(req.body)
        await restaurant.save()


        res.status(201).send({ restaurant })
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

exports.login = async(req, res) => {
    try {
        debugger;
        const restaurant = await Restaurant.findByCredentials(req.body.username, req.body.password)
        debugger;
        if (!restaurant) {
            throw new Error('No se encontró')
        }
        const token = await restaurant.generateAuthToken()
        res.send({ restaurant, token })
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
}

exports.findByDocument = async(req, res) => {
    try {
        // PUBLIC SEARCH; DON'T POPULATE TO BE SECUEE
        const restaurant = await Restaurant.findByDocument(req.body.document)  
        res.send({ restaurant })
        if (!restaurant) {
            res.status(404).send('No se encontró')
        }
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

exports.findById = async(req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.body.id)
        .populate("products")
        .populate("tables");
        if (!restaurant) {
            throw new Error('No se encontró')
        }
        res.send({ restaurant })
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getRestaurantById = async(req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            res.status(404).send('Not founded')
        }
        res.status(200).send({ restaurant })
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.updateToken = async(req, res) => {
    try {
        const restaurant = req.restaurant;
        const token = await restaurant.generateAuthToken()
        await restaurant.save();
        res.send({ restaurant, token })
    } catch (e) {
        res.status(500).send({ error: 'Error actualizando el token' })
    }
}

exports.logout = async(req, res) => {

    try {
        req.restaurant.tokens = req.restaurant.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.restaurant.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
}


exports.myProfile = async(req, res) => {
    res.send(req.restaurant)
}


exports.updateProfile = async(req, res) => {
    const updates = Object.keys(req.body)
    // Subscription, Admin, Configuration are not allowed to update
    const allowedUpdates = ['name', 'description', 'phone', 'products', 'tables', 'profilePhoto']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(403).send({ error: 'No permitido' })
    }

    try {

        updates.forEach((update) => req.restaurant[update] = req.body[update])
        await req.restaurant.save()

        res.send(req.restaurant)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.delete = async(req, res) => {
    try {
        await req.restaurant.remove();
        res.send(req.restaurant)
    } catch (e) {
        res.status(500).send( { error: e.message })
    }
}


exports.changePassword = async(req, res) => {
    try {
        const restaurant = req.restaurant;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        await Restaurant.changePassword(restaurant.document, oldPassword)
        restaurant.password = newPassword;
        await restaurant.save();
        res.send({ restaurant })
    } catch (e) {
        res.status(400).send({ error: 'Contraseña incorrecta' })
    }
}


exports.findByPhone = async(req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ phone: req.body.phone })
        if (!restaurant) {
            throw new Error('Numero no registrado')
        }
        res.send(restaurant)

    } catch (e) {
        res.status(404).send( { error: e.message })
    }
}

exports.findByEmail = async(req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ email: req.body.email })
        if (!restaurant) {
            throw new Error('Email no registrado')
        }
        res.send(restaurant)

    } catch (e) {
        res.status(404).send( { error: e.message })
    }
}

exports.findByDocument = async(req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ document: req.body.document })
        if (!restaurant) {
            throw new Error('Document no registrado')
        }
        res.send(restaurant)

    } catch (e) {
        res.status(404).send( { error: e.message })
    }
}

exports.getAvatar = async(req, res) => {
    try {
        // cloudinary.image("sample", {"crop":"fill","gravity":"faces","width":300,"height":200,"format":"jpg"});
        const restaurant = await Restaurant.findById(req.params.id)
        if (!restaurant || !restaurant.profilePhoto) {
            throw new Error('No se ha encontrado')
        }
        res.set('Content-Type', 'image/png')
        res.send(restaurant.profilePhoto)
    } catch (e) {
        res.status(404).send( { error: e.message })
    }
}

exports.getAvatarUrl = async(req, res) => {
    try {
        // cloudinary.image("sample", {"crop":"fill","gravity":"faces","width":300,"height":200,"format":"jpg"});
        if (!req.restaurant.profilePhoto) {
            throw new Error('No hay foto de perfil')
        }
        res.send({ profilePhoto: req.restaurant.profilePhoto })
    } catch (e) {
        res.status(404).send({ error: e.message })
    }
}


