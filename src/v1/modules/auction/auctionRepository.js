const db = require('../db')
const auctionTypeRepository = db.getRepository('auction_type')
const auctionRepository = db.getRepository('auction')

async function createNewAuction(auction) {
    const newAuction = await auctionRepository.save(auction)
    return newAuction
}

async function findAllTypes() {
    const types = await auctionTypeRepository.find()
    return types
}

async function getAll() {
    const auctions = await auctionRepository.find({
        select: {
            createdBy: {
                id: true,
                userName: true,
                avatar: true
            }
        },
        relations: {
            inmovable_property: true,
            movable_property: true,
            type: true,
            createdBy: true,
            auctionWinner: true,
            movable_property: {
                images: true
            },
            inmovable_property: {
                images: true
            }
        }
    })
    return auctions
}

async function getAllAuctionsByUserId(id) {
    const auctions = await auctionRepository.find({
        select: {
            createdBy: {
                id: true,
                userName: true,
                avatar: true
            }
        },
        relations: {
            inmovable_property: true,
            movable_property: true,
            type: true,
            createdBy: true,
            auctionWinner: true,
            movable_property: {
                images: true
            },
            inmovable_property: {
                images: true
            }
        },
        where: { 
            createdBy: {
                id
            } 
        }
    })
    return auctions
}

async function getAuctionById(id) {
    const auction = await auctionRepository.findOne({
        select: {
            createdBy: {
                id: true,
                userName: true,
                avatar: true
            }
        },
        relations: {
            inmovable_property: true,
            movable_property: true,
            type: true,
            createdBy: true,
            auctionWinner: true,
            movable_property: {
                images: true
            },
            inmovable_property: {
                images: true
            }
        },
        where: { id }
    })
    return auction
}


async function deleteAuction(auction) {
    const deleted = await auctionRepository.remove(auction)
    return deleted
}
module.exports = {
    findAllTypes,
    createNewAuction,
    getAll,
    getAuctionById,
    getAllAuctionsByUserId,
    deleteAuction
}