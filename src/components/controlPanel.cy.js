import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from '../assets/js/store/index.js'
import i18n from '../assets/js/language/index.js'

import ControlPanel from './controlPanel.vue'

describe('<ControlPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ControlPanel, {
      global: {
        plugins: [store, ElementPlus, i18n]
      }
    })
    cy.viewport(500, 800)
  })
})