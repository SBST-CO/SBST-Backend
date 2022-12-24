const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
const redis = require('../db/redis')
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS)

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
module.exports = {
    sendCode,
    getCode,
    encryptPassword
}