const db = require('../db')

const propertyRepository = db.getRepository('movable_property')

async function createNewProperty(property) {
    const newProperty = await propertyRepository.save(property)

    return newProperty
}

async function findAllProperty() {
    
    const properties = await propertyRepository.find({
        select: {
            createdBy: {
                id: true,
                userName: true,
                avatar: true
            }
        },
        relations: {
            createdBy: true
        },
    })

    return properties
}

async function findPropertyById(id) {
    
    const property = await propertyRepository.findOne({
        select: {
            createdBy: {
                id: true,
                userName: true,
                avatar: true
            }
        },
        relations: {
            createdBy: true
        },
        where: { id }
    })

    return property
}

async function findPropertiesByUserId(id) {

    const properties = await propertyRepository.find({
        select: {
            createdBy: {
                id: true,
                userName: true,
                avatar: true
            }
        },
        relations: {
            createdBy: true
        },
        where: {
            createdBy: {
                id
            }
        }
    })

    return properties
}

module.exports = {
    findAllProperty,
    findPropertyById,
    findPropertiesByUserId,
    createNewProperty
}