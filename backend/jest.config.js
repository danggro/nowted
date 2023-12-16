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
  SECRET: 'token',
  DATABASE_URL: 'postgres://postgres:secret@postgres-dev:5432/development',
  REDIS_URL: 'redis://redis-dev:6379',
})
