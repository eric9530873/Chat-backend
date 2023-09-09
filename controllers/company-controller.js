const { resume, record, company, User } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')

const companyController = {
    getCompanies: (req, res, next) => {
        Promise.all([
            company.findAndCountAll({
                nest: true,
                raw: true,
                include: [{ model: resume, as: 'Receiptrecord' }]
            })
        ])

            .then((company) => {
                res.json({ status: 'success', company })
            })
            .catch(err => next(err))
    },
    getCompany: (req, res, next) => {
        company.findByPk(req.params.id)
            .then((company) => {
                res.json({ status: 'success', company })
            })
            .catch(err => next(err))
    },
    postCompany: (req, res, next) => {
        if (!req.body.name) throw new Error('Company name is required')

        imgurFileHandler(req.file).then(filePath => {
            return company.create({
                name: req.body.name,
                tel: req.body.tel,
                address: req.body.address,
                description: req.body.description,
                image: filePath || null
            })
        })
            .then((newCompany) => {
                res.json({ status: 'success', company: newCompany })
            })
            .catch(err => next(err))
    }
}

module.exports = companyController