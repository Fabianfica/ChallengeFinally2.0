const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    specPattern: "/Users/fabian/Desktop/ChallengeFinally2.0/cypress/e2e/pages/*.spec.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  
    "viewportWidth": 414,
    "viewportHeight": 896
  
});
//cy.viewport(414, 896);
