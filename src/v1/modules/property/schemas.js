const Schemas = {

    newInmovableProperty: {
        $id: 'newInmovableProperty',
        type: 'object',
        required: ['createdBy', 'name', 'condition'],
        properties: {
            name: { type: 'string' },
            retailPrice: { type: 'number' },
            description: { type: 'string' },
            variantName: { type: 'string' },
            variantValue: { type: 'string' },
            retailUrl: { type: 'string' },
            retailerName: { type: 'string' },
            condition: {
                type: 'string',
                enum: ['NEW', 'USED', 'RECON']
            },
            createdBy: { type: 'number' }
            
        }
    },
    // loginUserSchema: {
    //     $id: 'loginUserSchema',
    //     type: 'object',
    //     required: ['email', 'password'],
    //     properties: {
    //         email: { type: 'string', format: 'email' },
    //         password: { type: 'string' }
    //     }
    // },
    // verifyUserSchema: {
    //     $id: 'verifySchema',
    //     type: 'object',
    //     required: ['code', 'confirmId'],
    //     properties: {
    //         code: { type: 'integer' },
    //         confirmId: { type: 'string' }
    //     }
    // },
    // logOutUserSchema: {
    //     $id: 'logOutUserSchema',
    //     type: 'object',
    //     required: ['token', 'refresh'],
    //     properties: {
    //         token: { type: 'string' },
    //         refresh: { type: 'string' }
    //     }
    // },

    // refreshUserSchema: {
    //     $id: 'refreshUserSchema',
    //     type: 'object',
    //     required: ['token', 'refresh'],
    //     properties: {
    //         token: { type: 'string' },
    //         refresh: { type: 'string' }
    //     }
    // },


}


module.exports = Schemas