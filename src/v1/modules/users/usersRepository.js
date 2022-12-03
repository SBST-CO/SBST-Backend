const db = require('../../../db/index')

async function findAllUsers() {
    const [rows, fields] = await db.execute(`SELECT username, email FROM user`)
    return rows
}

async function findUserById(id) {
    const [rows, fields] = await db.execute("SELECT id, username, email, lastLogin, createdAt, isActive, avatar FROM user WHERE `id` = ?", [id])
    return rows[0]
}

module.exports = {
    findAllUsers,
    findUserById
}