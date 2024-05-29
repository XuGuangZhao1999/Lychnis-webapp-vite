// Cypress test for App.vue
import App from './App.vue'

describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(App, {
      global: {
      }
    })
    cy.viewport(1920, 1080)
  })
})