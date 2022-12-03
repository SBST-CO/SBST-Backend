const authRepository = require('./authRepository')
const { nanoid } = require('nanoid')
const redis = require('../../../db/redis')

async function sendCode(user) { 
    const code = Math.floor(Math.random() * (9999 - 1111) + 1111)
    const confirmId = nanoid()

    const cached = await redis.set(confirmId, code)

    console.log(code)

    if(!cached == 'OK') {
        throw new Error('Error al intentar generar el codigo de confirmación')
    }

    return { confirmId }

}

async function getCode(confirmId) {
    const code = await redis.get(confirmId)

    return code
}

async function newUser(user) {
    try {
        const newUSer = await authRepository.createNewUser(user)
        const savedCode = await sendCode() // Set a random number, set a confirm id, save to redis and send to register response

        console.log(savedCode);
        
        return {
            user: {
                id: newUSer[0].insertId,
                email: user.email
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


async function verifyUser(confirmToken, userCode) {
    const code = await getCode(confirmToken)

    if(userCode != code) {
        return {
            error: {
                message: 'El codigo es incorrecto'
            }
        }
    }
    return { succes: true }
}

function authenticateUser(email, password) {
    console.log('authenticateUser ', email, password)
}

function verifyAuth() {
    
}

module.exports= {
    newUser,
    verifyUser
}