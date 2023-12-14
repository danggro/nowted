import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080',
    defaultCommandTimeout: 5500,
    experimentalRunAllSpecs: true,
  },
  env: {
    BACKEND_DEV: 'http://localhost:8080/api',
  },
})
