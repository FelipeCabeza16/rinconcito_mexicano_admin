const Formatter = require('../utils/formatters')
const formatFistCapital = async(req, res, next) => {
    try {
        const updates = Object.keys(req.body)

        const allowedUpdates = ['name']
        updates.forEach((update) => {
            if (allowedUpdates.includes(update)) {
                req.body[update] = Formatter.stringWithFirstCapitalLetter(req.body[update])
            }
        })
        next()
    } catch (e) {
        res.status(401).send({ error: 'Vuelve a iniciar sesión.' })
    }
}

module.exports = formatFistCapital