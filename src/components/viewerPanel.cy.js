// Cypress test for ViewerPanel.vue
import store from '../assets/js/store/index.js'
import ViewerPanel from './viewerPanel.vue'

store.commit('core/setBloaded', true)
describe('<ViewerPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ViewerPanel, {
      global: {
        plugins: [store]
      }
    })
    cy.viewport(1920, 1080)
    cy.get('.flexLayout').invoke('css', 'height', '1080px')
  })
})