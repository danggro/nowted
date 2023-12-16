import { Sequelize } from 'sequelize'
import { DATABASE_URL, NODE_ENV } from '../config'
import { Umzug, SequelizeStorage } from 'umzug'
import { Environment } from '../types'

const sequelize = new Sequelize(DATABASE_URL as string, {
  logging: false,
})

const umzug = new Umzug({
  migrations: {
    glob: [
      `./migrations/*.${NODE_ENV === Environment.Development ? 'ts' : 'js'}`,
      { cwd: __dirname },
    ],
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize,
  logger: console,
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database', err)
    return process.exit(1)
  }

  return null
}

export type Migration = typeof umzug._types.migration

const runMigrations = async () => {
  const migrations = await umzug.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  await umzug.down()
}

export { connectToDatabase, sequelize, rollbackMigration }
