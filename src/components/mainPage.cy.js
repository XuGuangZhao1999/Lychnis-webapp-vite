// Cypress test for mainPage.vue
import MainPage from './mainPage.vue'

describe('<MainPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(MainPage, {
      global: {
      }
    })
    cy.viewport(1920, 1080)
  })
})