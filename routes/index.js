const express = require('express')
const app = express()
const router = express.Router()
const passport = require('passport')

const formController = require('../controllers/form-controller')
const userController = require('../controllers/user-controller')

const { apiErrorHandler } = require('../middleware/error-handler')

router.get('/getforms', formController.getForms)

// router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin' }), userController.signIn)
router.post('/signup',userController.signUp)

router.use('/', apiErrorHandler)

module.exports = router