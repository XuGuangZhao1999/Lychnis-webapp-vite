import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from '../assets/js/store/index.js'
import i18n from '../assets/js/language/index.js'

import MenuBar from './menuBar.vue'

describe('<MenuBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(MenuBar, {
      global: {
        plugins: [store, ElementPlus, i18n]
      }
    })
    cy.viewport(1920, 1080)
  })
})