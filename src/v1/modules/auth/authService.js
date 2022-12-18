const authRepository = require('./authRepository')
const { nanoid } = require('nanoid')
const redis = require('../db/redis')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS)

const DEFAULT_AUTH_ERROR = {
    error: {
        message: "Email o contraseña incorrecta"
    }
}
const LOGIN_SECRET_KEY = process.env.LOGIN_SECRET_KEY
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY


async function sendCode(user) { 
    const code = Math.floor(Math.random() * (9999 - 1111) + 1111)
    const confirmId = nanoid()

    const confirmValue = {
        code,
        user,
        timeStamp: new Date()
    }

    console.log(confirmValue)

    const cached = await redis.set(confirmId, JSON.stringify(confirmValue))
    await redis.expire(confirmId, 3600) //Expira en 1 hora
    
    if(!cached == 'OK') {
        throw new Error('Error al intentar generar el codigo de confirmación')
    }

    return { confirmId }

}

async function getCode(confirmId) {
    const code = await redis.get(confirmId)

    return code
}

async function encryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds)
}

async function newUser(user) {
    try {
        user.passwordHash = await encryptPassword(user.password)
        user.password = null

        const newUser = await authRepository.createNewUser(user)
        const savedCode = await sendCode(newUser) // Set a random number, set a confirm id, save to redis and send to register response

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

async function setVerifiedUser(user) {
    return authRepository.setActiveUser(user.id)
}


async function verifyUser(confirmId, userCode) {
    const code = await getCode(confirmId)

    if(!code) {
        return {
            error: {
                message: 'El código de verificación no es válido o ha caducado'
            }
        }
    }

    const confirmData = JSON.parse(code)
    
    if(userCode != confirmData.code) {
        return {
            error: {
                message: 'El codigo es incorrecto'
            }
        }
    }
    
    await redis.del(confirmId) // Remove the key

    await setVerifiedUser(confirmData.user) // Activar el user
    
    return { success: true, message: "Cuenta verificada exitosamente!!" }
}

async function genTokens(user, ip) {

    const LOGIN_TOKEN_PAYLOAD = {
        type: 'LOGIN_TOKEN',
        data: user
    }

    const REFRESH_TOKEN_PAYLOAD = {
        type: 'REFRESH_TOKEN',
        ip
    }

    //const loginToken = await jwt.sign(LOGIN_TOKEN_PAYLOAD, LOGIN_SECRET_KEY, { expiresIn: 60000 })
    //const refreshToken = 

    const tokens = await Promise.all([
        jwt.sign(LOGIN_TOKEN_PAYLOAD, LOGIN_SECRET_KEY, { expiresIn: '1m' }),
        jwt.sign(REFRESH_TOKEN_PAYLOAD, REFRESH_SECRET_KEY, { expiresIn: '5m' })
    ])
    
    return {
        token: tokens[0],
        refresh: tokens[1]
    }
}

async function verifyAuth(token) {
    try {
        const verifiedToken = await jwt.verify(token, LOGIN_SECRET_KEY)

        console.log(verifiedToken)

        return verifiedToken
        
    } catch (error) {
        console.log(error)

        return {
            error: {
                message: 'El token es invalido o ha expirado!!',
                dev: error
            }
        }
    }
}

async function login(user, ip) {
    const userData = await authRepository.getUserLoginData(user.email)
    

    if(!userData) {
        return DEFAULT_AUTH_ERROR
    }

    console.log(userData)
    const isPasswordMath = await bcrypt.compare(user.password, userData.passwordHash)

    if(!isPasswordMath) {
        return DEFAULT_AUTH_ERROR
    }

    const authTokens = await genTokens(userData, ip)

    return authTokens
    
}

function authenticateUser(email, password) {
    console.log('authenticateUser ', email, password)
}


module.exports= {
    newUser,
    verifyUser,
    login,
    verifyAuth
}