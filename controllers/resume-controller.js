const db = require('../models')
const { User, resume, company, record } = db
const { imgurFileHandler } = require('../helpers/file-helpers')

const resumeController = {
    getResumes: (req, res, next) => {
        Promise.all([
            resume.findAndCountAll({
                include: [User, { model: company, as: 'Jobsearchrecord' }]
            })
        ])

            .then((resume) => {
                res.json({ status: 'success', resume })
            })
            .catch(err => next(err))
    },
    getResume: (req, res, next) => {
        return resume.findByPk(req.params.id, { include: [User, { model: company, as: 'Jobsearchrecord' }] })
            .then((resume) => {
                res.json({ status: 'success', resume })
            })
            .catch(err => next(err))
    },
    postResume: (req, res, next) => {
        if (!req.body.resumeName) throw new Error('Resume name is required')

        imgurFileHandler(req.file).then(filePath => {
            return resume.create({
                name: req.user.name,
                email: req.user.email,
                userId: req.user.id,
                resumeName: req.body.resumeName,
                tel: req.body.tel,
                address: req.body.address,
                education: req.body.education,
                image: filePath || null,
            })
        })
            .then((newResume) => {
                res.json({ status: 'success', resume: newResume })
            })
            .catch(err => next(err))
    },
    deleteResume: (req, res, next) => {
        return resume.findByPk(req.params.id)
            .then(resume => {
                if (!resume) throw new Error("resume didn't exist!")

                return resume.destroy()
            })
            .then((deleteresume) => res.json({ status: 'success', resume: deleteresume }))
            .catch(err => next(err))
    },
    putResume: (req, res, next) => {

        Promise.all([
            resume.findByPk(req.params.id),
            imgurFileHandler(req.file)
        ])
            .then(([Resume, filePath]) => {
                if (!Resume) throw new Error("Resume didn't exist")

                return Resume.update({
                    resumeName: req.body.resumeName,
                    tel: req.body.tel,
                    address: req.body.address,
                    image: filePath || Resume.image,
                    education: req.body.education
                })
            })
            .then((newResume) => {
                res.json({ status: 'success', Resume: newResume })
            })
            .catch(err => next(err))
    },
    addRecord: (req, res, next) => {
        Promise.all([
            company.findByPk(req.params.id),
            record.findOne({
                where: {
                    resumeId: req.body.id,
                    companyId: req.params.id
                }
            })
        ])
            .then(([Company, Record]) => {
                if (!Company) throw new Error("公司不存在")
                if (Record) throw new Error("已投遞履歷")

                return record.create({
                    resumeId: req.body.id,
                    companyId: req.params.id
                })
            })
            .then((company) => res.json({ company }))
            .catch(err => next(err))
    }
}



module.exports = resumeController