const Schemas = {

    newAuction: {
        $id: 'newAuction',
        type: 'object',
        required: ['title', 'starTime', 'startPrice', 'property_type', 'createdBy', 'type'],
        properties: {
            title: { type: 'string' },
            starTime: { type: 'string', format: 'date-time' },
            startPrice: { type: 'number' },
            estimatePrice: { type: 'number' },
            status: {
                type: 'string',
                enum: ['CREATED', 'IN_REVIEW', 'SCHEDULED', 'PUBLISHED', 'CANCELLED', 'LIVE', 'PERFORMED']
            },
            onLive: { type: 'boolean'},
            isPublic: { type: 'boolean'},
            isListed: { type: 'boolean'},
            property_type: {
                type: 'string',
                enum: ['inmovable', 'movable']
            },
            schedulePostTime: { type: 'string', format: 'date-time' },
            reason: { type: 'string' },
            awardPrice: { type: 'number' },
            auctionResult: { type: 'string' },
            createdBy: { type: 'number' },
            type: {
                type: 'string',
                enum: ['SD', 'SESCP', 'SESCS', 'SRR']
            },
            inmovable_property: { type: 'number' },
            movable_property: { type: 'number' },
            auctionWinner: { type: 'number' }
        }
    },
    
    updateAuction: {
        $id: 'updateAuction',
        type: 'object',
        required: [],
        properties: {
            title: { type: 'string' },
            starTime: { type: 'string', format: 'date-time' },
            startPrice: { type: 'number' },
            estimatePrice: { type: 'number' },
            status: {
                type: 'string',
                enum: ['CREATED', 'IN_REVIEW', 'SCHEDULED', 'PUBLISHED', 'CANCELLED', 'LIVE', 'PERFORMED']
            },
            onLive: { type: 'boolean'},
            isPublic: { type: 'boolean'},
            isListed: { type: 'boolean'},
            property_type: {
                type: 'string',
                enum: ['inmovable', 'movable']
            },
            schedulePostTime: { type: 'string', format: 'date-time' },
            type: {
                type: 'string',
                enum: ['SD', 'SESCP', 'SESCS', 'SRR']
            },
            inmovable_property: { type: 'number' },
            movable_property: { type: 'number' }
        }
    }

}

module.exports = Schemas