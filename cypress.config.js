// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qa.seuapp.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    retries: { runMode: 2, openMode: 0 },

    setupNodeEvents(on, config) {
      // Carregar env por ambiente
      const env = config.env.ENV || 'qa'
      const envConfig = require(`./config/env.${env}.json`)
      return { ...config, env: { ...config.env, ...envConfig } }
    },
  },

  env: {
    ENV: 'qa',
    apiUrl: 'https://api-qa.seuapp.com',
    users: {
      admin: { email: 'admin@teste.com', password: 'Admin@123' },
      user:  { email: 'user@teste.com',  password: 'User@123'  },
    },
  },
})
