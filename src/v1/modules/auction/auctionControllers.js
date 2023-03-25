const auctionService = require('./auctionService')
const auctionSchema = require('./schemas')

module.exports = function auctionController(fastify, opts, done) {

    fastify.addSchema(auctionSchema.newAuction)
    fastify.addSchema(auctionSchema.updateAuction)

    const newAuction = {
        schema: {
            body: {
                $ref: 'newAuction'
            }
        }
    }
    
    fastify.post('/', newAuction, async function(request, reply) {
        const { body } = request
        const auction = await auctionService.newAuction(body)

        if(auction.error) {
            console.log(auction);
            return reply.code(400).send(auction.error)
        }

        return reply.code(201).send(auction)
    })

    const updateAuction = {
        schema: {
            body: {
                $ref: 'updateAuction'
            }
        }
    }

    fastify.put('/:id', updateAuction, async function(request, reply) {
        const { body, params } = request
        const auction = await auctionService.updateAuction(params.id, body)

        if(auction.error) {
            console.log(auction);
            return reply.code(auction.error.httpStatus).send(auction.error)
        }

        return reply.code(201).send(auction)
    })

    fastify.delete('/:id', async function(request, reply) {
        const { params } = request
        const auction = await auctionService.deleteAuctionById(params.id)

        if(auction.error) {
            console.log(auction);
            return reply.code(auction.error.httpStatus).send(auction.error)
        }

        return reply.code(200).send(auction)
    })

    /** PRIVATE ENDPOINTS */

    const getMeOpts = {
        // preHandler: fastify.auth([
        //     fastify.verifySimpleAuth
        // ])
    }

    fastify.get('/', getMeOpts, async function () { //Admin
        return auctionService.getAllAuction()
    })
    
    fastify.get('/:id', async function (request, reply) {
        const { params } = request
        const auction = await auctionService.getAuctionById(params.id)

        if(auction.error) {
            return reply.code(auction.error?.httpStatus).send(auction.error)
        }

        reply.send(auction)
    })

    fastify.get('/user/:userId', async function (request) { // For authenticated User
        const { params } = request
        return auctionService.getAllAuctionsByUserId(params.userId)
    })

    
    fastify.get('/types', async function () {
        return auctionService.getAuctionTypes()
    })



    done()
}