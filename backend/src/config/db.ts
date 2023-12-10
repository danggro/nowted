import { Sequelize } from 'sequelize'
import env from '../config/config'
import { Umzug, SequelizeStorage } from 'umzug'

const sequelize = new Sequelize(env.DATABASE_URL)

const umzug = new Umzug({
  migrations: {
    glob: ['../migrations/*.ts', { cwd: __dirname }],
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
