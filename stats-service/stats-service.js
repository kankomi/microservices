const seneca = require('seneca')()

let stats = {
    login: 0
}
seneca.add('role:stats,cmd:user,type:login', function (args, done) {
    stats.login++
    done()
})

seneca.add('role:stats,cmd:stats', function (args, done) {
    done(stats)
})

seneca.listen({port: 9000})

seneca.fixedargs.fatal$ = false