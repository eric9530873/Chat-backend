const bcrypt = require('bcryptjs')
const db = require('../models')
const { User, resume } = db
const { imgurFileHandler } = require('../helpers/file-helpers')
const jwt = require('jsonwebtoken')

const userController = {
    signIn: (req, res, next) => {
        try {
            const userData = req.user.toJSON()
            const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
            res.json({
                status: 'success',
                data: {
                    token,
                    user: userData
                }
            })
        } catch (err) {
            next(err)
        }

    },
    signUp: (req, res, next) => {
        if (req.body.password !== req.body.passwordcheck) throw new Error('Password do not match')
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) throw new Error('Email is exist')
                return bcrypt.hash(req.body.password, 10)
            })
            .then(hash => User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            }))
            .then(user => { res.json({ status: 'success', user }) })
            .catch(err => next(err))

    },
    getUser: (req, res, next) => {
        User.findByPk(req.params.id, {
            include: [resume]
        })
            .then(user => {
                if (!user) throw new Error("User didn't exist!")


                user = user.toJSON()
                return user
            })
            .then(user => res.json({ status: 'success', user }))
            .catch(err => next(err))
    }
}
module.exports = userController
