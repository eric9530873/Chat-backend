const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../middleware/multer')

const resumeController = require('../controllers/resume-controller')
const userController = require('../controllers/user-controller')
const companyController = require('../controllers/company-controller')

const { authenticated, authenticatedAdmin } = require('../middleware/apiAuth')
const { apiErrorHandler } = require('../middleware/error-handler')


router.get('/users/:id', authenticated, userController.getUser)

router.get('/resumes/:id', authenticated, resumeController.getResume)
router.get('/resumes', authenticated, resumeController.getResumes)
router.post('/resumes', authenticated, upload.single('image'), resumeController.postResume)
router.delete('/resumes/:id', authenticated, resumeController.deleteResume)
router.put('/resumes/:id', authenticated, upload.single('image'), resumeController.putResume)

router.get('/companies/:id', authenticated, companyController.getCompanies)
router.get('/companies', authenticated, companyController.getCompanies)
router.post('/companies', authenticated, upload.single('image'), companyController.postCompany)

router.post('/addrecord/:id', authenticated, resumeController.addRecord)

router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin' }), userController.signIn)
router.post('/signup', userController.signUp)

router.use('/', apiErrorHandler)

module.exports = router