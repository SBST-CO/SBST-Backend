const usersRepository = require('./usersRepository')

function getUsersByEmail(email) {
    console.log('getUsers ', email)
}

async function getUsersById(id) {
    return usersRepository.findUserById(id)
}

async function getAllUser(id) {
    return usersRepository.findAllUsers(id)
}


module.exports= {
    getAllUser,
    getUsersById
}