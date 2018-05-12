module.exports = function users(options) {
    this.add({init: 'users'}, function(args, done) {
        console.log('initializing users...')
        console.log('STATS_HOST:' + process.env.STATS_HOST)
        console.log('STATS_PORTS:' + process.env.STATS_PORT)

        setTimeout(function() {
            console.log('done.')
            done()
        }, 2000)
    })

    this.add({role: 'users', cmd: 'login'}, function(args, done) {
        this.act('role:stats,cmd:user,type:login', function(error, _) {
            if (error) {
                console.log('an error occured: ' + error)
            }
        })
        done(null, {user: args.user, token: '121dadsd'})
    } )
}
