// Cypress test for appHeader.vue
import AppHeader from './appHeader.vue'

describe('<AppHeader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AppHeader, {
      global: {
      }
    })
    cy.viewport(1920, 1080)
  })
})