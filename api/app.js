var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()
const config = require('./config')

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
      .listen(config.apiPort)
console.log(`api started on port ${config.apiPort}`)

var seneca = require('seneca')()
seneca.fixedargs.fatal$ = false
seneca.use(SenecaWeb, senecaWebConfig)
      .use('api')
      .client({
            host: config.usersHost,
            port: config.usersPort,
            pin: 'role:users'
      })
      .client({
            host: config.statsHost,
            port: config.statsPort,
            pin: 'role:stats'
      })