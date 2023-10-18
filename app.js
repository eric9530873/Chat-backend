require('dotenv').config()

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082']
    }
})

const { User, Message } = require('./models')

const cors = require('cors')
app.use(cors())

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



server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




io.on('connection', (socket) => {
    console.log("a user connected")



    socket.on('connect', () => {

    })

    socket.on("Message", (message) => {
        console.log(message)
        Message.create({ text: message.text, user_id: message.userId, otheruser_id: message.otheruserId, status: message.status }).then(message => io.emit('Message', message))
    })

    socket.on('signin', (data) => {
        console.log('用戶登入', data.name);
        User.findAll({ raw: true }).then(userlist => io.emit('signin', userlist))
    })

    socket.on('signup', (data) => {
        console.log('用戶註冊', data.name)
        User.findAll({ raw: true }).then(userlist => io.emit('signup', userlist))

    })

    socket.on('connect', () => {
        User.findAll({ raw: true }).then(userlist => io.emit('connect', userlist))
    })

    socket.on('read', (message) => {
        console.log(message)
        // const messagelist = message.message
        // const messageId = messagelist.id
        // Message.update({ status: 0 }, { where: { id: messageId } })
        //     .then(() => {
        //         return Message.findAll({ raw: true })
        //     })
        //     .then(messages => io.emit('read', messages))

    })

})

module.exports = app