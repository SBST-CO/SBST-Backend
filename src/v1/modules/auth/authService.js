function createNewUser(user) {
    console.log('createNewUser ', user)
}

function getUsersByEmail(email) {
    console.log('getUsers ', email)
}

function getUsersById(id) {
    console.log('getUsers ', id)
}

function verifyNewUser(email, verifyTokenId) {
    console.log('verifyNewUser ', email, verifyTokenId)
}

function authenticateUser(email, password) {
    console.log('authenticateUser ', email, password)
}

function verifyAuth() {
    
}

module.exports= {
    createNewUser,

}