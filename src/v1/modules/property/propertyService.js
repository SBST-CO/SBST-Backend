const propertyRepository = require('./propertyRepository')

const DEFAULT_USER_ID_ERROR = {
    error: {
        code: 'invalidUserId',
        message: 'No es posible crear propiedades con este usuario'
    }
}

async function getAllProperties() {
    const properties = await propertyRepository.findAllProperty()
    return properties
}

async function getPropertyById(id) {
    const porperty = await propertyRepository.findPropertyById(id)
    return porperty
}

async function getPropertiesByUserId(userId) {
    const properties = await propertyRepository.findPropertiesByUserId(userId)

    return properties
}

async function newProperty(property) {
    
    try {
        
        const createdNewProp = await propertyRepository.createNewProperty(property)
        return createdNewProp
    
    } catch (error) {

        console.log(error);

        if(error.code == 'ER_NO_REFERENCED_ROW_2') {
            return DEFAULT_USER_ID_ERROR
        } else {
            throw new Error(error)
        }
    }

}

module.exports = {
    getAllProperties,
    getPropertyById,
    getPropertiesByUserId,
    newProperty
}