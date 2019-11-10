const User = require('../models/user')
const hashPass = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')
const {GoogleAuth} = require('google-auth-library');

class UserController {

    static createNewUser(req,res,next) {
        console.log('Enter user create')
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(function (user) {
            res.status(201).json({
                user: user,
                message: 'Thank You for registering'
            })
        })
        .catch(next)
    }

    static readAll (req,res,next) {
        User.find({})
            .then(function(users) {
                res.status(200).json(users)
            })
            .catch(next)
    }

    static login (req,res,next) {
        User.findOne({username: req.body.username})
        .then(function (user) {
            
            if (user && hashPass.checkPass(req.body.password, user.password)) {
                let payload = {
                    id: user.id,
                    email: user.email,
                    username: user.username
                }
                let token = generateToken(payload)
                res.status(202).json({token: token, message: `Hallo ${user.username}, hope you have a nice day !`})
            }else {
                next({status: 404, message: 'Invalid Username / Password'})
            }
        })
        .catch(next)
    };

    static googleLogin(req, res,next) {
        const client = new OAuth2Client(process.env.GOOGLECLIENTID)

        client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLECLIENTID
            })
            .then(ticket => {
                const payload = ticket.getPayload();
                const generateToken = jwt.sign(payload, process.env.secret)
                res.status(200).json(generateToken)
            })
            .catch(next)
    }
};

module.exports = UserController