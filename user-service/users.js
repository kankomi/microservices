const MongoClient = require('mongodb').MongoClient
const config = require('./config')

let db = null

/**
 * Lookup query in the MongoDB.
 * @param {*} args Arguments to search for.
 */
function find(args) {
    return new Promise((resolve, reject) => {
        db.find(args).toArray((err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

/**
 * Lists the users.
 * @param {*} args arguments
 * @param {*} done callback function
 */
async function listUser(args, done) {
    let users = await find({})
    for (let user of users) {
        delete user['password']
    }
    done(null, users)
}

/**
 * Logs in a user.
 * @param {*} args arguments
 * @param {*} done callback function
 */
async function loginUser(args, done) {
    // this.act('role:stats,cmd:user,type:login', function (error, _) {
    //     if (error) {
    //         console.log('an error occured: ' + error)
    //     }
    // })

    try {
        let users = await find({
            username: args.username
        })
        if (users.length === 0) {
            done({
                error: 404,
                message: `user '${args.username}' not found`
            })
            return
        }

        if (users[0].password !== args.password) {
            done({
                error: 403,
                message: "password not correct"
            })
            return
        }

        done()

    } catch (err) {
        done(err)
    }



}

/**
 * Adds a user if it doesn't exist.
 * @param {*} args arguments
 * @param {*} done callback function
 */
async function addUser(args, done) {
    let results = await find({
        username: args.username
    });
    if (results.length !== 0) {
        done({
            error: 400,
            message: `user '${args.username}' already exists!`
        })
        return
    }

    db.insert([{
        username: args.username,
        password: args.password,
        email: args.email
    }], (err, result) => {
        if (err) {
            done(err)
            return
        }
        done()
    })
}

module.exports = function users(options) {
    this.add({
        init: 'users'
    }, function (args, done) {
        console.log('initializing users...')
        console.log('STATS_HOST:' + config.statsHost)
        console.log('STATS_PORTS:' + config.statsPort)

        console.log('connecting to db...')

        MongoClient.connect(`mongodb://${config.mongoHost}:${config.mongoPort}`, {
            useNewUrlParser: true
        }, function (err, client) {
            if (err) {
                done(err)
                return
            }

            db = client.db('users').collection('users')
            console.log('db connection successful')
            done()
        })
    })

    this.add({
        role: 'users',
        cmd: 'login'
    }, loginUser)

    this.add({
        role: 'users',
        cmd: 'add'
    }, addUser)

    this.add({
        role: 'users',
        cmd: 'list'
    }, listUser)
}