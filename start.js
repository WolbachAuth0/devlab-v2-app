const server = require('./server')
const { logger } = require('./models/logger')
const Database = require('./models/Database.js')

startup(server)

async function startup(server) {
  logger.info(`starting server in ${process.env.NODE_ENV} mode.`)
  logger.info(`loaded environment variables from ${process.env.NODE_ENV} settings.`)

  // connect to database
  const database = new Database(process.env.DB_CONNECTION_STRING)
  try {
    await database.connect()
    logger.info(`successfully connected to database`)
  } catch (error) {
    logger.warn('An error occurred while connecting to database.')
    logger.error(error)
  }

  // gracefully handle shutdown
  process.once('SIGINT', async () => { await shutdown(database) })
  process.once('SIGTERM', async () => { await shutdown(database) })
  process.once('SIGUSR2', async () => { await shutdown(database) })

  const port = process.env.PORT || 3000
  server.listen(port, () => {
    logger.info(`application is listening on port: ${port}`)
  })
}

/**
 * Gracefully stop the server and release resources (e.g. database)
 */
async function shutdown(database) {
  try {
    logger.info(`Initiate graceful shutdown ...`)
    await database.disconnect()
    logger.info('Shutdown complete.')
  } catch (error) {
    logger.info('Graceful shutdown wasn\'t graceful ...')
    console.error(error)
  }
  process.kill(process.pid, 'SIGUSR2')
  process.exit()
}

// export the startup and shutdown methods so that unit tests can import them
module.exports = {
  startup,
  shutdown
}
