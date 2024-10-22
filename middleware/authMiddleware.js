const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // check if jwt is exist and valid
    if(token) {
        jwt.verify(token, 'Rio secret token', (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    }else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    // check if jwt is exist and valid
    if(token) {
        jwt.verify(token, 'Rio secret token', async (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.app.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.app.locals.user = user
                next()
            }
        })
    }else {
        res.app.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }