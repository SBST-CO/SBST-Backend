const auctionRepository = require('./auctionRepository')

const NOT_FOUND_AUCTION = {
    error: {
        code: 'notFoundAuction',
        message: 'La subasta no existe',
        httpStatus: 404
    }
}

const ER_NO_REFERENCED_ROW_2 = {
    FK_CREATED_BY_USER_ID_AUCTION: {
        code: 'invalidUserId',
        message: 'No es posible crear subastas con este usuario'
    },
    FK_AUCTION_TYPE: {
        code: 'invalidAuctionType',
        message: 'Este tipo de subastas no existe'
    },
    FK_AUCTION_INMOVABLE_PROPERTY: {
        code: 'invalidPropertyId',
        message: 'La propiedad no existe'
    },
    FK_AUCTION_MOVABLE_PROPERTY: {
        code: 'invalidPropertyId',
        message: 'La propiedad no existe'
    },
    FK_CREATED_BY_USER_ID_AUCTION_WINNER: {
        code: 'invalidUserId',
        message: 'Usuario no existe'
    }
}

async function getAuctionTypes() {
    return auctionRepository.findAllTypes()
}

async function newAuction(auction) {
    try {
        
        if (auction.property_type == 'inmovable') {
            delete auction.movable_property
        } else {
            delete auction.inmovable_property
        }
        
        const newAuction = await auctionRepository.createNewAuction(auction)
        
        return newAuction
    } catch (error) {
        //console.log(error);

        const CONSTRAINT = error.sqlMessage.split("`")[5]

        
        if (error.code == 'ER_NO_REFERENCED_ROW_2') {
            const responseError = {
                error: ER_NO_REFERENCED_ROW_2[CONSTRAINT]
            }

            return responseError
        }
        return {
            error: {
                code: error.code,
                message: error.message
            }
        }
    }
}

async function getAllAuction() {
    return auctionRepository.getAll()
}

async function updateAuction(id, auctionData) {
    const auction = await auctionRepository.getAuctionById(id)

    delete auctionData.auctionResult
    delete auctionData.awardPrice
    delete auctionData.createdBy
    delete auctionData.id
    delete auctionData.status
    delete auctionData.onLive

    

    if(!auction) return NOT_FOUND_AUCTION

    const updatedAuctionData = {...auction, ...auctionData}
    const updated = await auctionRepository.createNewAuction(updatedAuctionData)

    return updated
}

async function deleteAuctionById(id) {
    const auction = await auctionRepository.getAuctionById(id)
    
    if(!auction) return NOT_FOUND_AUCTION

    const deleted = await auctionRepository.deleteAuction(auction)
    return deleted
}

async function getAuctionById(id) {
    const auction = await auctionRepository.getAuctionById(id)
    if(!auction) return NOT_FOUND_AUCTION
    return auction
}

async function getAllAuctionsByUserId(id) {
    const auctions = await auctionRepository.getAllAuctionsByUserId(id)
    return auctions
} 

module.exports = {
    getAuctionTypes,
    newAuction,
    getAllAuction,
    updateAuction,
    getAuctionById,
    getAllAuctionsByUserId,
    deleteAuctionById
}