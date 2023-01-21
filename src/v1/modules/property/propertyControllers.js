const propertyService = require('./propertyService')
const propertiesSchemas = require('./schemas')

module.exports = function propertyController(fastify, opts, done) {

    fastify.addSchema(propertiesSchemas.newInmovableProperty)

    const newPropOpt = {
        schema: {
            body: {
                $ref: 'newInmovableProperty'
            }
        }
    }

    fastify.post('/', newPropOpt, async function (request, reply) {
        
        const { body } = request
        const property = await propertyService.newProperty(body)

        if(property.error) {
            return reply.code(400).send(property.error)
        }

        reply.code(201).send(property)
    })
    
    fastify.get('/', opts, async function (request, reply) {
        const properties = await propertyService.getAllProperties()
        reply.send(properties)
    })

    fastify.get('/user/:id', opts, async function (request, reply) {

        const { params } = request

        const properties = await propertyService.getPropertiesByUserId(params.id)
        reply.send(properties)
    })

    fastify.get('/:id', async function (request, reply) {
        const { params } = request
        const property = await propertyService.getPropertyById(params.id)
        reply.send(property)
    })

    done()
}