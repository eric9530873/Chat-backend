const db = require('../models')
const { User, resume, Message } = db
const { imgurFileHandler } = require('../helpers/file-helpers')


const messageController = {
    getMessages: (req, res, next) => {
        Message.findAll({ raw: true })
            .then(messages => res.json({ status: 'success', messages }))
            .catch(err => next(err))
    }
}
module.exports = messageController