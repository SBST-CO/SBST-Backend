function userControllers(fastify, opts, done) {

    

    fastify.get('/all', async function (request, reply) {
        reply.send({ message: ['alls', 'áll'] })
    })

    done()
}

module.exports = userControllers