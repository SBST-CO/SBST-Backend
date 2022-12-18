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
            return reply.code(403).send(new Error(verificationResult.error.message))
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

        const autheticatedUser = await authServices.login({email: body.email, password: body.password}, request.socket.remoteAddress)

        if(autheticatedUser.error) {
            return reply.code(401).send(new Error(autheticatedUser.error.message))
        }

        reply.send(autheticatedUser)  
    })

    fastify.get('/ping', async function(request, reply) {
        const { headers } = request
        const token = headers.authorization.split(' ')[1]
        console.log(token);
        
        const vdata = await authServices.verifyAuth(token)
        
        if(vdata.error) {
            return reply.code(401).send(new Error(vdata.error.message))
        }

        reply.send(vdata)

    })

    done()
}

module.exports = authController