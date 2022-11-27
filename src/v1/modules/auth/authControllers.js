const registerSchemas = require('./schemas')
const authServices = require('./authService')

function authController(fastify, opts, done) {

    fastify.addSchema(registerSchemas.newUserSchema)
    fastify.addSchema(registerSchemas.privateUserSchema)
    fastify.addSchema(registerSchemas.publicUserSchema)

    const registerOpt = {
        schema: { 
            body: { 
                $ref: 'newUserSchema'
            }
        }
    }

    fastify.post('/register', registerOpt, async function (request, reply) {
        
        const { body } = request

        
        reply.callNotFound()
    })

    fastify.get('/verify', async function (request, reply) {
        reply.send({message: 'hola'})
    })

    fastify.post('/login', async function (request, reply) {
        
        const { body } = request

        reply.send({
            body
        })
    })

    done()
}

module.exports = authController