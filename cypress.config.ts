import { defineConfig } from "cypress";
import dotenv from 'dotenv' 

dotenv.config({path: '.env.e2e' })

export default defineConfig({
  e2e: {
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    login_url: '/login',
    username: process.env.E2E_USERNAME,
    password: process.env.E2E_PASSWORD
  },
});
