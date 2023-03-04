const db = require('../db')
const { MovableProperty } = require('../db/entities')

const propertyRepository = db.getRepository('movable_property')
const InmovalblePropertyRepository = db.getRepository('inmovable_property')


async function createNewProperty(property) {
    const newProperty = await propertyRepository.save(property)

    return newProperty
}

async function createNewInmovableProperty(property) {
    const newProperty = await InmovalblePropertyRepository.save(property)

    return newProperty 
}

async function updatePropertyById(property) {
    const updatedProperty = await propertyRepository.save(property)
    return updatedProperty
}

async function deletePropertyById(property) {
    const deleted = await propertyRepository.remove(property)
    return deleted
}

async function updateInmovablePropertyById(property) {
    const updatedProperty = await InmovalblePropertyRepository.save(property)
    return updatedProperty
}

async function deleteInmovablePropertyById(property) {
    const deleted = await InmovalblePropertyRepository.remove(property)
    return deleted
}

async function findAllProperty(order, limit = process.env.FIXED_PAGE_SIZE || 10, skip = 0) {
            
    const properties = await propertyRepository.find({
        order,
        take: limit,
        skip,
        select: {
            createdBy: {
                id: true,
                userName: true,
                avatar: true
            }
        },
        relations: {
            createdBy: true,
            images: true
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
            createdBy: true,
            images: true
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
            createdBy: true,
            images: true
        },
        where: {
            createdBy: {
                id
            }
        }
    })

    return properties
}

async function findAllInmovableProperty(order, limit = process.env.FIXED_PAGE_SIZE || 10, skip = 0) {
        
    const properties = await InmovalblePropertyRepository.find({
        order,
        take: limit,
        skip,
        select: {
            createdBy: {
                id: true,
                userName: true,
                avatar: true
            }
        },
        relations: {
            createdBy: true,
            images: true
        },
    })

    console.log(properties);

    return properties
}

async function findInmovablePropertyById(id) {
    
    const property = await InmovalblePropertyRepository.findOne({
        select: {
            createdBy: {
                id: true,
                userName: true,
                avatar: true
            }
        },
        relations: {
            createdBy: true,
            images: true
        },
        where: { id }
    })

    return property
}

async function findInmovablePropertiesByUserId(id) {

    const properties = await InmovalblePropertyRepository.find({
        select: {
            createdBy: {
                id: true,
                userName: true,
                avatar: true
            }
        },
        relations: {
            createdBy: true,
            images: true
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
    createNewProperty,
    createNewInmovableProperty,
    findAllInmovableProperty,
    findInmovablePropertyById,
    findInmovablePropertiesByUserId,
    updatePropertyById,
    deletePropertyById,
    updateInmovablePropertyById,
    deleteInmovablePropertyById
}