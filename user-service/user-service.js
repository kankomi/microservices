let seneca = require('seneca')();
const config = require('./config')

seneca.use('users')
      .client({
            host: config.statsHost,
            port: config.statsPort,
            pin: 'role:stats'
      })
      .listen({
            port: 9000
      })

seneca.act('role:users,cmd:login,username:admin,password:passss', function (res, err) {
      if (err) {
            console.error(err)
      } else {
            console.log("login successfull")
      }
})

seneca.act('role:users,cmd:add,username:user,password:passss,email:user@example.com', function (res, err) {
      if (err) {
            console.error(err)
      } else {
            console.log("user created")
      }
})

seneca.act('role:users,cmd:list', function (res, err) {
      if (err) {
            console.error(err)
      } else {
            console.log(res)
      }
})