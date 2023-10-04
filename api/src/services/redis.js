const Redis = require('ioredis')
const redis = new Redis()

redis.on('error', err => {
  logger.redis.error(err)
  console.error(err)
})

redis.on('connect', () => {
  console.info('Redis Connection has been established successfully.')
})

module.exports = redis
