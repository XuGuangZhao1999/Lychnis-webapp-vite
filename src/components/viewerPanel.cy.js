import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from '../assets/js/store/index.js'
import i18n from '../assets/js/language/index.js'

import ViewerPanel from './viewerPanel.vue'

store.commit('core/setBloaded', true)
describe('<ViewerPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ViewerPanel, {
      global: {
        plugins: [store, ElementPlus, i18n]
      }
    })
    cy.viewport(1920, 1080)
    cy.get('.flexLayout').invoke('css', 'height', '1080px')
  })
})