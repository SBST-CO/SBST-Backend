const Schemas = {

    newMovableProperty: {
        $id: 'newMovableProperty',
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
            createdBy: { type: 'number' },
            images: {
                type: 'array',
                minItems: 1,
                items: { 
                    type: 'object',
                    properties: {
                        url: {
                            type: 'string',
                            format: 'url'
                        },
                        MIMETYPE:{
                            type: 'string',
                        },
                        isMain: {
                            type: 'boolean'
                        }
                    },
                    required: ['url']
                }
            }
        }
    },
    
    newInmovableProperty: {
        $id: 'newInmovableProperty',
        type: 'object',
        required: ['city', 'name', 'type'],
        properties: {
            name: { type: 'string' },
            marketPrice: { type: 'number' },
            description: { type: 'string' },
            type: {
                type: 'string',
                enum: ['APT', 'CAS', 'OFI', 'LOC']
            },
            coordinates: { type: 'string' },
            sourceMaps: { type: 'string' },
            city: { type: 'string' },
            address: { type: 'string' },
            area: { type: 'number' },
            roomsNum: { type: 'number' },
            createdBy: { type: 'number' },
            images: {
                type: 'array',
                minItems: 1,
                items: { 
                    type: 'object',
                    properties: {
                        url: {
                            type: 'string',
                            format: 'url'
                        },
                        MIMETYPE:{
                            type: 'string',
                        },
                        isMain: {
                            type: 'boolean'
                        }
                    },
                    required: ['url']
                }
            }
        }
    },

}


module.exports = Schemas