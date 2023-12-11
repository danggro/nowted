module.exports = {
  transform: {
    '^.+\\.ts?$': ['ts-jest', { isolatedModules: true }],
  },
  testEnvironment: 'node',
  testRegex: './src/.*\\.(test|spec)?\\.(js|ts)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
}
process.env = Object.assign(process.env, {
  DATABASE_URL: 'postgres://postgres:secret@postgres_db:5432/postgres',
  REDIS_URL: 'redis://redis:6379',
})
