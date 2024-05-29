// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'
import getStore from '../../src/assets/js/store/index.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from '../../src/assets/js/language/index.js'

Cypress.Commands.add('mount', (component, options = {}) => {
    // Setup options object
    options.global = options.global || {}
    options.global.stubs = options.global.stubs || {}
    options.global.stubs['transition'] = false
    options.global.components = options.global.components || {}
    options.global.plugins = options.global.plugins || []
  
    // Use store passed in from options, or initialize a new one
    const { store = getStore, ...mountOptions } = options
  
    // Add Vuex plugin
    options.global.plugins.push({
      install(app) {
        app.use(store)
        app.use(ElementPlus, { locale: store.getters['core/locale'] })
        app.use(i18n)
      },
    })
  
    return mount(component, mountOptions)
  })

// Example use:
// cy.mount(MyComponent)