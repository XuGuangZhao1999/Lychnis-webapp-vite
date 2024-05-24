import AnimationPanel from './animationPanel.vue'

describe('<AnimationPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AnimationPanel)
  })
})