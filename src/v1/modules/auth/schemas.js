const Schemas = {

    newUserSchema: {
        $id: 'newUserSchema',
        type: 'object',
        required: ['userName', 'email', 'password'],
        properties: {
            userName: { type: 'string' },
            email: { type:'string', format: 'email' },
            password: { type: 'string' }
        }
    },
    loginUserSchema: {
        $id: 'loginUserSchema',
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
        }
    },
    verifyUserSchema: {
        $id: 'verifySchema',
        type: 'object',
        required: ['code', 'confirmId'],
        properties: {
            code: { type: 'integer' },
            confirmId: { type: 'string' }
        }
    },
    logOutUserSchema: {
        $id: 'logOutUserSchema',
        type: 'object',
        required: ['token', 'refresh'],
        properties: {
            token: { type: 'string' },
            refresh: { type: 'string' }
        }
    },

    refreshUserSchema: {
        $id: 'refreshUserSchema',
        type: 'object',
        required: ['token', 'refresh'],
        properties: {
            token: { type: 'string' },
            refresh: { type: 'string' }
        }
    },


}


module.exports = Schemas