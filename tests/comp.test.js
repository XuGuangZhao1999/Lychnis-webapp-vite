// Description: This file is used to test the components of the project.
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from '../src/assets/js/store/index.js'
import { mount, shallowMount } from '@vue/test-utils'
import i18n from '../src/assets/js/language/index.js'
import ResizeObserver from 'resize-observer-polyfill'

// Components
import app from '../src/App.vue'

// Mock ResizeObserver
global.ResizeObserver = ResizeObserver

describe('Component Testing', () => {
    it('app', ()=>{
        const wrapper = shallowMount(app, {
            global: {
                plugins: [store, ElementPlus, i18n]
            }
        })
    
        expect(wrapper.exists()).toBe(true)
    })

})
