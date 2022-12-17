const db = require('../db')

const userRepository = db.getRepository('user')

async function findAllUsers() {
    return userRepository.find({
        select: {
            id: true,
            userName: true,
            email: true
        }
    })
}

async function findUserById(id) {
    return userRepository.findOne({
        select: {
            id: true,
            userName: true,
            email: true
        },
        where: {
            id
        }
    })
}

module.exports = {
    findAllUsers,
    findUserById
}