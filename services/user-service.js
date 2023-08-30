const { User } = require('../models')
const bcrypt = require('bcryptjs')

const userServices = {
    signUp: (req, cb) => {
        if (req.body.password !== req.body.passwordCheck) throw new Error('Password do not match')

        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) throw new Error('Email already exists')

                return bcrypt.hash(req.body.password, 10)
            })
            .then(hash => User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            }))
            .then(user => cb(null, user))
            .catch(err => cb(err))
    }
}
module.exports = userServices