const bcr = require('bcryptjs')

function hashPassword (pass) {
    return bcr.hashSync(pass, bcr.genSaltSync(5))
}

function checkPass (pass, hashPass) {
    return bcr.compareSync(pass, hashPass)
}

module.exports = {
    hashPassword,
    checkPass
}