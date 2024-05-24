import ScriptPanel from './scriptPanel.vue'

describe('<ScriptPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ScriptPanel)
  })
})