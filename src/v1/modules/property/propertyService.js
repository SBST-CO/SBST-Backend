const propertyRepository = require('./propertyRepository')

const ALLOWED_ORDER = {
    'id:asc': {
        id: 'ASC'
    },

    'id:desc': {
        id: 'DESC'
    },

    'name:asc': {
        name: 'ASC'
    },

    'name:desc': {
        name: 'DESC'
    },

    'retailPrice:asc': {
        retailPrice: 'ASC'
    },

    'retailPrice:desc': {
        retailPrice: 'DESC'
    },

    'createdAt:asc': {
        createdAt: 'ASC'
    },

    'createdAt:desc':{
        createdAt: 'DESC'
    },
    
    'undefined': {
        createdAt: 'ASC'
    }
}

const DEFAULT_USER_ID_ERROR = {
    error: {
        code: 'invalidUserId',
        message: 'No es posible crear propiedades con este usuario'
    }
}

const NOT_FOUND_PROPERTY = {
    error: {
        code: 'notFoundProperty',
        message: 'La propiedad no existe',
        httpStatus: 404
    }
}

async function deletePropertyById(id) {
    const property = await propertyRepository.findPropertyById(id)
    
    if(!property) return NOT_FOUND_PROPERTY

    const deleted = await propertyRepository.deletePropertyById(property)
    return deleted
}

async function updatePropertyById(id, data) {
    const property = await propertyRepository.findPropertyById(id)
    
    delete data.id
    delete data.createdBy
    delete data.createdAt
    delete data.updatedAt
        
    if(!property) return NOT_FOUND_PROPERTY
    
    const newData = {...property, ...data}
    
    const updated = await propertyRepository.updatePropertyById(newData)
    return updated
}

async function getAllProperties(query) {

    const order = ALLOWED_ORDER[query.order]?ALLOWED_ORDER[query.order]:{createdAt: 'ASC'};
    
    const properties = await propertyRepository.findAllProperty(order, query.limit, query.offset)
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

async function newInmovableProperty(property) {
    try {
        
        const createdNewProp = await propertyRepository.createNewInmovableProperty(property)
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

async function getAllInmovableProperties(query) {

    const order = ALLOWED_ORDER[query.order]?ALLOWED_ORDER[query.order]:{createdAt: 'ASC'};

    const properties = await propertyRepository.findAllInmovableProperty(order, query.limit, query.offset)
    return properties
}

async function getInmovablePropertyById(id) {
    const porperty = await propertyRepository.findInmovablePropertyById(id)
    return porperty
}

async function getInmovablePropertiesByUserId(userId) {
    const properties = await propertyRepository.findInmovablePropertiesByUserId(userId)

    return properties
}

async function deleteInmovablePropertyById(id) {
    const property = await propertyRepository.findInmovablePropertyById(id)
    
    if(!property) return NOT_FOUND_PROPERTY

    const deleted = await propertyRepository.deleteInmovablePropertyById(property)
    return deleted
}

async function updateInmovablePropertyById(id, data) {
    const property = await propertyRepository.findInmovablePropertyById(id)
    
    delete data.id
    delete data.createdBy
    delete data.createdAt
    delete data.updatedAt
        
    if(!property) return NOT_FOUND_PROPERTY
    
    const newData = {...property, ...data}
    
    const updated = await propertyRepository.updateInmovablePropertyById(newData)
    return updated
}

module.exports = {
    getAllProperties,
    getPropertyById,
    getPropertiesByUserId,
    newProperty,
    newInmovableProperty,
    getAllInmovableProperties,
    getInmovablePropertyById,
    getInmovablePropertiesByUserId,
    deletePropertyById,
    updatePropertyById,
    updateInmovablePropertyById,
    deleteInmovablePropertyById
}