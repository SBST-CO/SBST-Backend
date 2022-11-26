const Schemas = {

    newUserSchema: {
        $id: 'newUserSchema',
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
            username: { type: 'string' },
            email: { type:'string', format: 'email' },
            password: { type: 'string' }
        }
    },
    privateUserSchema: {
        $id: 'privateUserSchema',
        type: 'object',
        properties: {
            id: { type: 'integer' }, 
            username: { type: 'string' },
            email: { type:'string', format: 'email' },
            pasword: { type: 'string' },
            lastLogin: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type:'string' },
            isActive: { type: 'boolean' },
            avatar: { type: 'string' }
        }
    },
    publicUserSchema: {
        $id: 'publicUserSchema',
        type: 'object',
        properties: {
            id: { type: 'integer' }, 
            username: { type: 'string' },
            createdAt: { type: 'string' },
            isActive: { type: 'boolean' },
            avatar: { type: 'string' }
        }
    },


}


module.exports = Schemas