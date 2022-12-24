const jwt = require('jsonwebtoken')
const redis = require('../db/redis')

const LOGIN_SECRET_KEY = process.env.LOGIN_SECRET_KEY
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY
const LOGIN_EXPIRE = process.env.LOGIN_EXPIRE
const REFRESH_EXPIRE = process.env.REFRESH_EXPIRE

async function blackListToken(token, timeLeft) {
    const blackListed = await redis.set(token, token)
    await redis.expire(token, timeLeft)

    return blackListed
}

async function genTokens(user, ip) {

    delete user.passwordHash

    const LOGIN_TOKEN_PAYLOAD = {
        type: 'LOGIN_TOKEN',
        data: user
    }

    const REFRESH_TOKEN_PAYLOAD = {
        type: 'REFRESH_TOKEN',
        ip
    }

    const tokens = await Promise.all([
        jwt.sign(LOGIN_TOKEN_PAYLOAD, LOGIN_SECRET_KEY, { expiresIn: LOGIN_EXPIRE }),
        jwt.sign(REFRESH_TOKEN_PAYLOAD, REFRESH_SECRET_KEY, { expiresIn: REFRESH_EXPIRE, notBefore: LOGIN_EXPIRE })
    ])
    
    return {
        token: tokens[0],
        refresh: tokens[1]
    }
}


async function getBlackListToken(token) {
    const isListed = await redis.get(token)

    if(isListed) {
        return isListed
    }else {
        return false
    }
}

module.exports = {
    blackListToken,
    genTokens,
    getBlackListToken
}