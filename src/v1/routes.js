module.exports  = function (fastify, opts, done) {
    fastify.register(require('./modules/auth/authControllers'), { prefix: '/auth' })
    fastify.register(require('./modules/users/usersControllers'), {
        prefix: '/users', 
        preHandler: fastify.auth([
            fastify.verifySimpleAuth
        ]) 
    })
    fastify.register(require('./modules/property/propertyControllers'), { prefix: 'property'})
    fastify.register(require('./modules/auction/auctionControllers'), { prefix: 'auction' })
    done()
}