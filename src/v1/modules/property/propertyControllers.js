const propertyService = require('./propertyService')
const propertiesSchemas = require('./schemas')

module.exports = function propertyController(fastify, opts, done) {

    fastify.addSchema(propertiesSchemas.newInmovableProperty)
    fastify.addSchema(propertiesSchemas.newMovableProperty)

    const newPropOpt = {
        schema: {
            body: {
                $ref: 'newMovableProperty'
            }
        }
    }

    fastify.post('/movable', newPropOpt, async function (request, reply) {
        
        const { body } = request
        const property = await propertyService.newProperty(body)

        if(property.error) {
            return reply.code(400).send(property.error)
        }

        reply.code(201).send(property)
    })

    
    fastify.get('/movable', opts, async function (request, reply) {
        const { query } = request
        
        const properties = await propertyService.getAllProperties(query)
        reply.send(properties)
    })
    
    fastify.get('/movable/user/:id', opts, async function (request, reply) {
        
        const { params } = request

        const properties = await propertyService.getPropertiesByUserId(params.id)
        reply.send(properties)
    })
    
    fastify.get('/movable/:id', async function (request, reply) {
        const { params } = request
        const property = await propertyService.getPropertyById(params.id)
        reply.send(property)
    })

    fastify.put('/movable/:id', async function (request, reply) {
        const { params, body } = request
        const property = await propertyService.updatePropertyById(params.id, body)
        if(property.error) {
            return reply.code(property.error?.httpStatus).send(property.error)
        }
        reply.code(200).send(property)
    })

    fastify.delete('/movable/:id', async function (request, reply) {
        const { params, body } = request
        const property = await propertyService.deletePropertyById(params.id)
        if(property.error) {
            return reply.code(property.error?.httpStatus).send(property.error)
        }
        reply.code(200).send(property)
    })
    

    const newInPropOpt = {
        schema: {
            body: {
                $ref: 'newInmovableProperty'
            }
        }
    }
    
    fastify.post('/inmovable', newInPropOpt, async function (request, reply) {
        
        const { body } = request
        const property = await propertyService.newInmovableProperty(body)

        if(property.error) {
            return reply.code(400).send(property.error)
        }

        reply.code(201).send(property)
    })

    fastify.get('/inmovable', opts, async function (request, reply) {
        const { query } = request

        const properties = await propertyService.getAllInmovableProperties(query)
        reply.send(properties)
    })
    
    fastify.get('/inmovable/user/:id', opts, async function (request, reply) {
        
        const { params } = request

        const properties = await propertyService.getInmovablePropertiesByUserId(params.id)
        reply.send(properties)
    })
    
    fastify.get('/inmovable/:id', async function (request, reply) {
        const { params } = request
        const property = await propertyService.getInmovablePropertyById(params.id)
        reply.send(property)
    })

    fastify.put('/inmovable/:id', async function (request, reply) {
        const { params, body } = request
        const property = await propertyService.updateInmovablePropertyById(params.id, body)
        if(property.error) {
            return reply.code(property.error?.httpStatus).send(property.error)
        }
        reply.code(200).send(property)
    })

    fastify.delete('/inmovable/:id', async function (request, reply) {
        const { params, body } = request
        const property = await propertyService.deleteInmovablePropertyById(params.id)
        if(property.error) {
            return reply.code(property.error?.httpStatus).send(property.error)
        }
        reply.code(200).send(property)
    })


    
    
    done()
}