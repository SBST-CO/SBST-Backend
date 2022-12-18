const db = require('../db')

const userRepository = db.getRepository('user')

async function createNewUser(user) {

    console.log(user)
    const newUser = {
        userName: user.userName,
        email: user.email,
        passwordHash: user.passwordHash
    }
    const createdUser = await userRepository.save(newUser)

    return createdUser
}

async function setActiveUser(id) {
    const user = await userRepository.findOneByOrFail({id})
    user.isActive = true
    await userRepository.save(user)

    return true
}

async function getUserLoginData(email) {
    const user = await userRepository.findOne({
        select: {
            id: true,
            email: true,
            userName: true,
            passwordHash: true,
        },
        where: {
            email
        }
    })

    return user
}

module.exports = {
    createNewUser,
    setActiveUser,
    getUserLoginData
}