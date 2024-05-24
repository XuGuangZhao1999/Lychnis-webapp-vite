import { createStore } from 'vuex'
import statusModel from './modules/status.js'
import coreModel from './modules/core.js'

const store = createStore({
    modules:{
        status: statusModel,
        core: coreModel
    }
})

export default store