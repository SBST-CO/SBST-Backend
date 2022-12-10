const authRepository = require('./authRepository')
const { nanoid } = require('nanoid')
const redis = require('../../../db/redis')

async function sendCode(user) { 
    const code = Math.floor(Math.random() * (9999 - 1111) + 1111)
    const confirmId = nanoid()

    const confirmValue = {
        code,
        user,
        timeStamp: new Date()
    }

    const cached = await redis.set(confirmId, JSON.stringify(confirmValue))
    await redis.expire(confirmId, 3600) //Expira en 1 hora

    console.log(confirmValue)

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
        const savedCode = await sendCode(newUSer[0].insertId) // Set a random number, set a confirm id, save to redis and send to register response

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

async function setVerifiedUser(userId) {
    // user.isActive = true SQL Query
}


async function verifyUser(confirmToken, userCode) {
    const code = await getCode(confirmToken)


    if(!code) {
        return {
            error: {
                message: 'El código de verificación no es válido o ha caducado'
            }
        }
    }


    const confirmData = JSON.parse(code)
    
    console.log('ConfirmData: ', confirmData)

    if(userCode != code) {
        return {
            error: {
                message: 'El codigo es incorrecto'
            }
        }
    }
    await setVerifiedUser(confirmData.user) // Activar el user

    return { success: true }
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