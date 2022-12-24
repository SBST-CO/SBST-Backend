'use strict'
const localize = require('ajv-i18n')
require('dotenv').config()
const { verifySimpleAuth } = require('./src/v1/modules/verifier')

const fastify = require('fastify')({ 
  logger: true,
  ajv: {
    customOptions: {
      allErrors: true
    },
    plugins: [
      require('ajv-formats'),
      [require('ajv-errors'), { singleError: false}]
    ]
  }
})

fastify.decorate('verifySimpleAuth', verifySimpleAuth)


fastify.register(require('@fastify/auth'))
fastify.register(require('@fastify/routes'))
fastify.register(require('./src/v1/routes'), { prefix: '/v1' })
fastify.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
    localize.es(error.validation)
    reply.status(400).send({
      statusCode: error.statusCode,
      message: "Error en los datos enviados",
      errors: error.validation.map(err => err.message)
    })
  }
  reply.send(error)
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()