const bcrypt = require('bcryptjs')
const { User } = require('../models')
const userServices = require('../services/user-service')

const userController = {
    signIn: (req, res, next) => {

    },
    signUp: (req, res, next) => {
        userServices.signUp(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    }
}
module.exports = userController
