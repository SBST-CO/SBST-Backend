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

        const res = await authServices.newUser(body, reply)

        if(res.error) {
            return reply.code(400).send(new Error(res.error.message))
        }

        reply.code(201).send(res)
    })

    fastify.post('/verify', async function (request, reply) {
        
        const { body } = request

        const verificationResult = await authServices.verifyUser(body.confirmToken, body.code)

        if(verificationResult.error) {
            return reply.code(403).send(new Error(verificationResult.error.message))
        }

        reply.send(verificationResult)  

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