import SpecialNodePanel from './specialNodePanel.vue'

describe('<SpecialNodePanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SpecialNodePanel)
  })
})