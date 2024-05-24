import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from '../src/assets/js/store/index.js'
import i18n from '../src/assets/js/language/index.js'

import App from './App.vue'

describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(App, {
      global: {
        plugins: [store, ElementPlus, i18n]
      }
    })
    cy.viewport(1920, 1080)
  })
})