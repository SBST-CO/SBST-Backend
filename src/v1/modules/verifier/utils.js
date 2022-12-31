const jwt = require('jsonwebtoken')
const redis = require('../db/redis')

const LOGIN_SECRET_KEY = process.env.LOGIN_SECRET_KEY
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY
const LOGIN_EXPIRE = process.env.LOGIN_EXPIRE
const REFRESH_EXPIRE = process.env.REFRESH_EXPIRE
const EXTENDED_LOGIN_EXPIRE = process.env.EXTENDED_LOGIN_EXPIRE
const EXTENDED_REFRESH_EXPIRE = process.env.EXTENDED_REFRESH_EXPIRE

async function blackListToken(token, timeLeft) {
    const blackListed = await redis.set(token, token)
    await redis.expire(token, timeLeft)

    return blackListed
}

async function genTokens(user, ip, extend=false) {

    delete user.passwordHash

    const LOGIN_TOKEN_PAYLOAD = {
        type: 'LOGIN_TOKEN',
        data: user
    }

    const REFRESH_TOKEN_PAYLOAD = {
        type: 'REFRESH_TOKEN',
        ip
    }

    const loginExpire = extend? EXTENDED_LOGIN_EXPIRE: LOGIN_EXPIRE
    const refreshExpire = extend? EXTENDED_REFRESH_EXPIRE: REFRESH_EXPIRE

    const tokens = await Promise.all([
        jwt.sign(LOGIN_TOKEN_PAYLOAD, LOGIN_SECRET_KEY, { expiresIn: loginExpire }),
        jwt.sign(REFRESH_TOKEN_PAYLOAD, REFRESH_SECRET_KEY, { expiresIn: refreshExpire, notBefore: loginExpire })
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