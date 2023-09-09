require('dotenv').config()

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const session = require('express-session')
const SESSION_SECRET = 'secret'
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))

const passport = require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

const path = require('path')
app.use('/upload', express.static(path.join(__dirname, 'upload')))

const routes = require('./routes')
app.use(routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app