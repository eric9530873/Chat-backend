require('dotenv')

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const passport = require('./config/passport')
// app.use(passport.initialize())
// app.use(passport.session())

const routes = require('./routes')
app.use(routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app