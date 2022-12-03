const db = require('../../../db/index')

async function createNewUser(user) {
    const newUser = user
    const createdUser = await db.execute('INSERT INTO user(userName, email, passwordHash) VALUES(?, ?, ?)', [
        newUser.userName,
        newUser.email,
        newUser.password
    ])

    return createdUser
}

module.exports = {
    createNewUser
}