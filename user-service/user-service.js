let seneca = require('seneca')();

const STATS_PORT=process.env.STATS_PORT || "localhost"
const STATS_HOST=process.env.STATS_HOST || 9006

seneca.use('users')
      .client({
            host: STATS_HOST,
            port: STATS_PORT,
            pin: 'role:stats'
      })
      .listen({
            port: 9000
      })
