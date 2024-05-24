import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './assets/js/language/index.js'
import store from './assets/js/store/index.js'

// Global function
// Paint image on canvas
let paintChain = Promise.resolve()

window.paint = function(imageBinary) {
    paintChain = paintChain.then(() => new Promise((resolve) =>{
        let blob = new Blob([imageBinary], {type: "image/jpeg"})
        let img = new Image()

        img.src = URL.createObjectURL(blob)
        img.onload = function() {
            let canvas = document.getElementById("viewer")
            let ctx = canvas.getContext("2d")

            // Two canvas are used to avoid the image being blurred
            let offscreen = new OffscreenCanvas(canvas.width, canvas.height)
            let offscreenCtx = offscreen.getContext("2d")
            offscreenCtx.imageSmoothingEnabled = true
            offscreenCtx.drawImage(img, 0, 0)

            requestAnimationFrame(() => {
                ctx.drawImage(offscreen, 0, 0)
            })
            resolve()
        }
    }))
}

// Show message
window.showMessage = function(message) {
    store.commit("status/showMessage", message)
}

// Set the information of the volume
window.setInfos = function(infos){
    let infosJSON = JSON.parse(infos)

    for(let infoName in infosJSON){
        let mutation = "core/set" + infoName
        store.commit(mutation, infosJSON[infoName])
    } 
}

// Create app instance
const app = createApp(App)
app.use(ElementPlus, {locale: store.getters["core/locale"]})
app.use(store)
app.use(i18n)
app.mount('#app')
