const registerSchemas = require('./schemas')
const authServices = require('./authService')

function authController(fastify, opts, done) {

    fastify.addSchema(registerSchemas.newUserSchema)
    fastify.addSchema(registerSchemas.privateUserSchema)
    fastify.addSchema(registerSchemas.publicUserSchema)
    fastify.addSchema(registerSchemas.loginUserSchema)

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

        const verificationResult = await authServices.verifyUser(body.confirmId, body.code)

        if(verificationResult.error) {
            let exeption = new Error(verificationResult.error.message)
            exeption.code = verificationResult.error.code
            return reply.code(403).send(exeption)
        }

        reply.send(verificationResult)  

    })

    const loginOpts = {
        schema: {
            body: {
                $ref: 'loginUserSchema'
            }
        }
    }

    fastify.post('/login', loginOpts, async function (request, reply) {
        
        const { body } = request

        const authenticatedUser = await authServices.login({email: body.email, password: body.password}, request.socket.remoteAddress)

        if(authenticatedUser.error) {
            let exeption = new Error(authenticatedUser.error.message)
            exeption.code = authenticatedUser.error.code

            return reply.code(401).send(exeption)
        }

        reply.send(authenticatedUser)  
    })

    fastify.post('/logout', async function (request, reply) {
        const { body } = request

        const logOutRes = await authServices.logout(body.token, body.refresh)

        reply.send(logOutRes)
    })

    fastify.post('/refresh', async function(request, reply) {
        const { body } = request

        const refreshedTokens = await authServices.refreshToken(body.token, body.refresh, request.socket.remoteAddress)

        if(refreshedTokens.error) {
            let exeption = new Error(refreshedTokens.error.message)
            exeption.code = refreshedTokens.error.code
            
            return reply.code(401).send(exeption)
        }

        reply.send(refreshedTokens)
    })

    done()
}

module.exports = authController