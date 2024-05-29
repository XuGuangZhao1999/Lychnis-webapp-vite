// Cypress test for controlPanel.vue
import ControlPanel from './controlPanel.vue'

describe('<ControlPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ControlPanel, {
      global: {
      }
    })
    cy.viewport(500, 800)
  })
})