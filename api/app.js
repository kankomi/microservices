var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()

var usersHost = process.env.USERS_HOST || "localhost"
var usersPort = process.env.USERS_PORT || 9001
var statsHost = process.env.STATS_HOST || "localhost"
var statsPort = process.env.STATS_PORT || 9002

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: {
            parseBody: false
      } // so we can use json body-parser
}

var app = Express()
      .use(require('body-parser').json())
      .use(context)
      .listen(80)

var seneca = require('seneca')()
seneca.fixedargs.fatal$ = false
//   .use('entity')
seneca.use(SenecaWeb, senecaWebConfig)
      .use('api')
      //   .client( { type:'tcp', pin:'role:math' } )
      .client({
            host: usersHost,
            port: usersPort,
            pin: 'role:users'
      })
      .client({
            host: statsHost,
            port: statsPort,
            pin: 'role:stats'
      })


// create a dummy product
// seneca.act(
//   'role:shop,add:product',{data:{name:'Apple',price:1.99}},
//   console.log
// )