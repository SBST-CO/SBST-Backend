const registerSchemas = require('./schemas')

function authController(fastify, opts, done) {

    fastify.addSchema(registerSchemas.newUserSchema)
    fastify.addSchema(registerSchemas.privateUserSchema)
    fastify.addSchema(registerSchemas.publicUserSchema)


    fastify.post('/register', {
        schema: { 
            body: { $ref: 'newUserSchema'}
        } 
    }, async function (request, reply) {
        
        const { body } = request

        const [rows, fields] = await fastify.mysql.query(`SELECT username, email FROM user`)
        reply.send(rows)
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



    fastify.get('/a', async function(request, reply) {
        reply.callNotFound()
    })

    done()
}

module.exports = authController