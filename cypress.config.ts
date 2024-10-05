import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 10000,  // Устанавливает тайм-аут в 10 секунд
  pageLoadTimeout: 60000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:4000', // или другой актуальный базовый URL
  },
};

