module.exports = {
    mongoHost: 'localhost',
    mongoPort: 27017,
    statsHost: process.env.STATS_HOST || 'localhost',
    statsPort: process.env.STATS_PORT || 9003
}