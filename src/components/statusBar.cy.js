import StatusBar from './statusBar.vue'

describe('<StatusBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(StatusBar)
  })
})