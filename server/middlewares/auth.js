const jwt = require('../helpers/jwt')

function auth (req,res,next) {
    try {
        const decoded = jwt.tokenVerify(req.headers.token)
        req.decoded = decoded;
        console.log(req.decoded)
        next()
    }catch(err) {
        res.status(403).json({message: 'You must login as user first'})
    }
}

module.exports = auth