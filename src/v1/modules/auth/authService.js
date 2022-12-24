const authRepository = require('./authRepository')
const jwt = require('jsonwebtoken')
const redis = require('../db/redis')
const bcrypt = require('bcrypt')
const { sendCode, getCode, encryptPassword } = require('./utils')
const { genTokens, blackListToken, getBlackListToken } = require('../verifier/utils')

const LOGIN_SECRET_KEY = process.env.LOGIN_SECRET_KEY
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY
const DEFAULT_AUTH_ERROR = {
    error: {
        code: 'invalidCredentials',
        message: "Email o contraseña incorrecta"
    }
}

async function newUser(user) {
    try {
        user.passwordHash = await encryptPassword(user.password)
        user.password = null

        const newUser = await authRepository.createNewUser(user)
        const savedCode = await sendCode(newUser)

        return {
            user: {
                id: newUser.id,
                userName: newUser.userName,
                email: newUser.email,
            },
            verify: savedCode
        }

    } catch (error) {
        if(error.code == 'ER_DUP_ENTRY') {
            switch(error.sqlMessage.split("'")[3]) {
                case 'user.UN_userName':
                    return {
                        error: {
                            message: `El nombre de usuario ${user.userName} ya existe!!`
                        }
                    }
                case 'user.UN_email':
                    return {
                        error: {
                            message: `El email ${user.email} ya existe!!`
                        }
                    }
                default: 
                    return error
            }
        } else {
            throw new Error(error)
        }
    }
}

async function verifyUser(confirmId, userCode) {
    const code = await getCode(confirmId)

    if(!code) {
        return {
            error: {
                code: 'invalidOrExpiredCode',
                message: 'El código de verificación no es válido o ha caducado'
            }
        }
    }

    const confirmData = JSON.parse(code)
    
    if(userCode != confirmData.code) {
        return {
            error: {
                code: 'invalidCode',
                message: 'El codigo es incorrecto'
            }
        }
    }
    
    await redis.del(confirmId)

    await authRepository.setActiveUser(confirmData.user.id)
    
    return { success: true, message: "Cuenta verificada exitosamente!!" }
}

async function login(user, ip) {
    const userData = await authRepository.getUserLoginData(user.email)
    
    if(!userData) {
        return DEFAULT_AUTH_ERROR
    }
    
    console.log(userData)
    if(!userData.isActive) {
        return {
            error: {
                code: 'userNotActive', 
                message: 'Por favor confirme su cuenta antes de iniciar sesión'
            }
        }
    }


    const isPasswordMatch = await bcrypt.compare(user.password, userData.passwordHash)

    if(!isPasswordMatch) {
        return DEFAULT_AUTH_ERROR
    }

    const authTokens = await genTokens(userData, ip)

    return authTokens
    
}

async function logout(token, refreshToken) {

    const decodedLoginToken = await jwt.decode(token)
    const loginExpireIn = new Date(decodedLoginToken.exp*1000) - new Date()
    let listedLogin

    if(loginExpireIn > 0) {
        listedLogin = await blackListToken(token, Math.round(loginExpireIn*0.001))
        console.log(listedLogin);
    }

    const decodedRefreshToken = await jwt.decode(refreshToken)
    const refreshExpireIn = new Date(decodedRefreshToken.exp*1000) - new Date()
    let listedRefresh

    if(refreshExpireIn > 0) {
        listedRefresh = await blackListToken(refreshToken, Math.round(refreshExpireIn*0.001))
        console.log(listedRefresh)
    }

    return {
        
        now: new Date(),
        loginToken_expire: new Date(decodedLoginToken.exp*1000),
        refreshToken_expire: new Date(decodedRefreshToken.exp*1000),
        login_blackListed: listedLogin?listedLogin:false,
        refresh_blackListed: listedRefresh?listedRefresh:false
    }
}

async function refreshToken(loginToken, refreshToken, requestIp) {
    
    const isBlackListed = await getBlackListToken(refreshToken)

    if(isBlackListed) return {error: { code: 'blackListedToken', message: 'El token es invalido o ha expirado'}}

    try {

        const verifiedRefresh = await jwt.verify(refreshToken, REFRESH_SECRET_KEY)

        if(requestIp != verifiedRefresh.ip) {
            return {
                error: {
                    code: 'invalidSender',
                    message: 'TokenError: invalid request addres'
                }
            }
        }

        await logout(loginToken, refreshToken)

        const decodedLoginToken = await jwt.decode(loginToken, LOGIN_SECRET_KEY)

        const newTokens = await genTokens(decodedLoginToken.data, verifiedRefresh.ip)

        return newTokens
        
    } catch (error) {
        console.log(error);

        return {
            error: {
                code: error.name,
                message: 'El token es invalido o ha expirado'
            }
        }
    }
}



module.exports = {
    newUser,
    verifyUser,
    login,
    logout,
    refreshToken
}