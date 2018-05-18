module.exports = {
    usersHost: process.env.USERS_HOST || 'localhost',
    usersPort: process.env.USERS_PORT || 9000,
    statsHost: process.env.STATS_HOST || "localhost",
    statsPort: process.env.STATS_PORT || 9002,
    apiPort: process.env.API_PORT || 8080
}