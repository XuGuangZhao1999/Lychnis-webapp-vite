// Cypress test for menuBar.vue
import MenuBar from './menuBar.vue'

describe('<MenuBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(MenuBar, {
      global: {
      }
    })
    cy.viewport(1920, 1080)
  })
})