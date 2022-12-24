const { getBlackListToken } = require('./utils')
const jwt = require('jsonwebtoken')

const LOGIN_SECRET_KEY = process.env.LOGIN_SECRET_KEY
const DEFAULT_VERIFIER_ERROR = {
    code: 'authRequired',
    message: 'Autenticación requerida'
}

const DEFAULT_MISS_JWT = {
    conde: 'missingJwt',
    message: 'Su solicitud debe incluir encabezados de autenticación'
}

const DEFAULT_NOT = {
    code: 'notAllowed',
    message: 'No tienes permiso para acceder a la información solicitada'
}

const DEFAULT_LOGIN_ERROR = {
    code: 'invalidOrExpiredToken',
    message: 'El token es invalido o ha expirado'
}

function ex(ex) {
    let exeption = new Error(ex.message)
    exeption.code = ex.code

    return exeption

}

async function verifySimpleAuth(request, reply, done) {

    const { headers } = request

    
    if(!headers['authorization']) {
        return done(ex(DEFAULT_MISS_JWT))
    }
    
    const authToken = headers.authorization.split(' ')[1]
    const isBlackListed = await getBlackListToken(authToken)

    if(isBlackListed) return done(ex(DEFAULT_VERIFIER_ERROR))

    try {
        const verifiedToken = await jwt.verify(authToken, LOGIN_SECRET_KEY)
        if(!verifiedToken) return done(ex(DEFAULT_LOGIN_ERROR))

        request.authUser = verifiedToken.data

    } catch (error) {
        return done(ex(DEFAULT_LOGIN_ERROR))
    }
    
}





module.exports = {
    verifySimpleAuth
}