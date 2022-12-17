const db = require('../db')

const userRepository = db.getRepository('user')

async function createNewUser(user) {
    const newUser = {
        userName: user.userName,
        email: user.email
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

module.exports = {
    createNewUser,
    setActiveUser
}