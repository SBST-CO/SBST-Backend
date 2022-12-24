const usersServices = require('./usersService')

function userControllers(fastify, opts, done) {

    

    fastify.get('/all', opts,async function (request, reply) {
        const users = await usersServices.getAllUser()

        console.log(request.authUser);

        reply.send(users)
    })

    fastify.get('/:id', async function (request, reply) {
        const { params } = request
        const users = await usersServices.getUsersById(params.id)
        
        if(!users) {
            return reply.code(404).send(new Error(`El usuario con id ${params.id} No existe!!`))
        }

        reply.send(users)
    })

    done()
}

module.exports = userControllers