const bcrypt = require('bcryptjs')

const passport = require('passport')
const LocalStrategy = require('passport-local')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const db = require('../models')
const { User, resume } = db

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        User.findOne({ where: { email } })
            .then(user => {
                if (!user) return done(null, false)

                bcrypt.compare(password, user.password)
                    .then(res => {
                        if (!res) return done(null, false)

                        return done(null, user)
                    })
            })
    }
));

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, cb) => {

    User.findByPk(jwtPayload.id, {
    })
        .then(user => cb(null, user))
        .catch(err => cb(err))
}))

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findByPk(id, {
        include: [resume]
    })
        .then(user => {
            user = user.toJSON()
            // console.log(user)
            return done(null, user)
        })
        .catch(err => done(err))
});


module.exports = passport