import ChannelColorSelector from './channelColorSelector.vue'

describe('<ChannelColorSelector />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ChannelColorSelector)
  })

  it('renders with default props', () => {
    const onChangeColorSpy = cy.spy().as('onChangeColorSpy')
    const onChangeVisibilitySpy = cy.spy().as('onChangeVisibilitySpy')
    cy.mount(ChannelColorSelector, {
      props: {
        changeHandler: onChangeColorSpy,
        changeVisibility: onChangeVisibilitySpy
      }
    })
    cy.get('[data-cy=color-label]').should('have.text', 'C0')
    cy.get('[data-cy=color-picker]').should('have.value', '#000000')
    cy.get('[data-cy=color-picker]').invoke('val', '#ff0000').trigger('change', {force: true})
    cy.get('[data-cy=color-picker]').should('have.value', '#ff0000')
    cy.get('[data-cy=color-input-wrapper]').rightclick()
  })

  it('renders with special props', () => {
    const onChangeColorSpy = cy.spy().as('onChangeColorSpy')
    const onChangeVisibilitySpy = cy.spy().as('onChangeVisibilitySpy')
    cy.mount(ChannelColorSelector, {
      props: {
        channelIndex: 1,
        channelColor: '#00ff00',
        changeHandler: onChangeColorSpy,
        changeVisibility: onChangeVisibilitySpy
      }
    })
    cy.get('[data-cy=color-label]').should('have.text', 'C1')
    cy.get('[data-cy=color-picker]').should('have.value', '#00ff00')
    cy.get('[data-cy=color-picker]').invoke('val', '#0000ff').trigger('change', {force: true})
    cy.get('[data-cy=color-picker]').should('have.value', '#0000ff')
    cy.get('[data-cy=color-input-wrapper]').rightclick()
  })
})