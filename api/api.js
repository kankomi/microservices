module.exports = function api(options) {
    this.add('init:api', function (msg, respond) {
        this.fatal$ = false
        this.act('role:web', {
            routes: {
                prefix: '/api',
                pin: 'role:api,path:*',
                map: {
                    user: {
                        GET: true,
                        suffix: '/:operation'
                    },
                    stats: {
                        GET: true
                    }
                }
            }
        })

        respond();
    })

    this.add('role:api,path:user', function (msg, respond) {

        let operation = msg.args.params.operation
        let usermsg = {
            role: 'users'
        }

        if (operation == 'login') {
            usermsg.username = msg.args.query.username || null
            usermsg.password = msg.args.query.password || null
            usermsg.cmd = 'login'
        }
        
        console.log("this is version 7")
        this.act(usermsg, respond)

    });

    this.add('role:api,path:stats', function (msg, respond) {
        try {
            this.act('role:stats,cmd:stats,fatal$:false', function (err, res) {
                if (err) {
                    respond(err.output)
                    return
                }
                respond(res)
            })
        } catch (error) {
            respond(error)
        }
    })
}