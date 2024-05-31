<!-- Viewer panel -->
<template>
  <div class="flexLayout">
    <div
      v-if="store.state.core.bLoaded"
      class="constrast"
    >
      <el-slider
        v-model="lower"
        show-input
        size="small"
        :debounce="100"
        :max="upper"
        @wheel="lHandler"
      />
      <el-slider
        v-model="upper"
        show-input
        size="small"
        :debounce="100"
        :max="65535"
        @wheel="uHandler"
      />
      <input
        type="number"
        :value="gamma"
        style="height: auto; width: 20px; text-align: center;"
        readonly="true"
      >
    </div>
    <div
      v-show="store.state.core.bLoaded"
      class="wrapper"
    >
      <canvas
        id="viewer"
        ref="canvas"
        class="imageContainer"
        width="1600"
        height="1200"
      />
      <div class="channelBar">
        <div class="channel">
          <channelColorSelector
            v-for="(channel, index) in store.state.core.channels"
            :key="index"
            :channel-index="channel.index"
            :channel-color="rgbToHex(channel.color)"
            :change-handler="updateColor"
            :change-visibility="updateVisibility"
          />
        </div>
      </div>
    </div>
    <div
      v-if="store.state.core.bLoaded"
      style="display: flex; justify-content: center; background-color: #313131;"
    >
      <el-slider
        v-model="currentLevel"
        show-input
        :show-input-controls="false"
        :debounce="100"
        :max="store.state.core.levels"
        :min="1"
        size="small"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import channelColorSelector from './UI/channelColorSelector.vue'
import { rgbToHex } from '../assets/js/utils/colorFormatChange';

export default {
    name: 'ViewerPanel',
    components: {
        channelColorSelector
    },
    setup() {
        const canvas = ref(null)
        const store = useStore()
        const currentLevel = computed({
            get: () => store.state.core.currentLevel + 1,
            set: (value) => store.dispatch('core/updateResolution', value)
        })
        const lower = computed({
            get: () => store.state.core.contrastRange.lower,
            set: (value) => {
                updateContrast(value, upper.value)
            }
        })
        const upper = computed({
            get: () => store.state.core.contrastRange.upper,
            set: (value) => updateContrast(lower.value, value)
        })
        const gamma = computed(()=> store.state.core.channels[0].gamma)

        // Update the contrast range
        function updateContrast(v1, v2) {
            store.dispatch('core/updateChannelContrast', {
                "lower": v1,
                "upper": v2
            })
        }

        // Handle the lower slider wheel event
        function lHandler(e) {
            if(e.deltaY > 0) {
                lower.value -= 1
            } else {
                lower.value += 1
            }
        }

        // Handle the upper slider wheel event
        function uHandler(e) {
            if(e.deltaY > 0) {
                upper.value -= 1
            } else {
                upper.value += 1
            }
        }

        // Promise queue
        let interactQueue = Promise.resolve()
            
        function interact(eventHandler) {
            interactQueue = interactQueue.then(eventHandler)
            return interactQueue
        }

        function interactEventHandler(req){
            return new Promise((resolve, reject)=>{
                        window.cefQuery({
                            request: JSON.stringify(req),
                            onSuccess: function(response){
                                window.showMessage(response)
                                resolve()
                            },
                            onFailure: function(error_code, error_message){
                                window.showMessage(error_code + ": " + error_message)
                                reject()
                            }
                        })
                    })
        }

        // Get the modifier key
        const getModifier = function(e) {
            let modifier = {}
            modifier["Shift"] = e.shiftKey
            modifier["Control"] = e.ctrlKey

            return modifier
        }

        // Get the key
        const getKey = function(e) {
            let keys = {
                "A": 0,
                "B": 1,
                "D": 2,
                "F": 3,
                "R": 4,
                "V": 5,
                "X": 6,
                "Z": 7,
                "ARROWLEFT": 8,
                "ARROWRIGHT": 9,
                " ": 10,
                "HOME": 11,
                "END": 12,
                "ARROWUP": 13,
                "ARROWDOWN": 14,
                "DELETE": 15,
                "ESCAPE": 16,
            }
            let key = keys[(e.key).toUpperCase()]

            return key
        }

        // Mouse event handlers
        function mouseDownHandler(e, scaleX, scaleY) {
            let req = {
                "functionName": "mousePressEvent",
                "args": {
                    "button": e.button,
                    "posX": e.offsetX * scaleX, 
                    "posY": e.offsetY * scaleY,
                    "modifier": getModifier(e),
                }
            }

            interact(interactEventHandler(req))
        }

        function mouseUpHandler(e, scaleX, scaleY) {
            let req = {
                "functionName": "mouseReleaseEvent",
                "args": {
                    "button": e.button,
                    "posX": e.offsetX * scaleX, 
                    "posY": e.offsetY * scaleY,
                    "modifier": getModifier(e),
                }
            }
            
            interact(interactEventHandler(req))
        }

        function mouseMoveHandler(e, scaleX, scaleY) {
            let btn = 0
            switch (e.buttons) {
                case 1:
                    btn = 0
                    break
                case 2:
                    btn= 2
                    break
                case 4:
                    btn = 1
                    break
                default:
                    btn = 0
                    break
            }
            let req = {
                "functionName": "mouseMoveEvent",
                "args": {
                    "button": btn,
                    "posX": e.offsetX * scaleX, 
                    "posY": e.offsetY * scaleY,
                    "modifier": getModifier(e),
                }
            }
            
            interact(interactEventHandler(req))
        }

        function wheelHandler(e, scaleX, scaleY) {
            let req = {
                "functionName": "wheelEvent",
                "args": {
                    "deltaY": -e.deltaY,
                    "posX": e.offsetX * scaleX,
                    "posY": e.offsetY * scaleY
                }
            }

            interact(interactEventHandler(req))
        }

        // Key event handlers
        function keyDownHandler(e) {
            let req = {
                "functionName": "keyPressEvent",
                "args": {
                    "key": getKey(e),
                    "modifier": getModifier(e),
                    "bAutoRepeat": e.repeat
                },
            }

            interact(interactEventHandler(req))
        }

        function keyUpHandler(e) {
            let req = {
                "functionName": "keyReleaseEvent",
                "args": {
                    "key": getKey(e),
                    "modifier": getModifier(e),
                    "bAutoRepeat": e.repeat
                }
            }

            interact(interactEventHandler(req))
        }

        function updateColor(index, color) {
            store.dispatch('core/updateChannelColor', {
                "index": index,
                "color": color
            })
        }
        
        function updateVisibility(index, visibility) {
            store.dispatch('core/updateChannelVisibility', {
                "index": index,
                "visible": visibility
            })
        }

        onMounted(()=>{
            let canvasRef = canvas.value
            let scaleX = canvasRef.width / canvasRef.offsetWidth
            let scaleY = canvasRef.height / canvasRef.offsetHeight
            
            // Resize observer
            let resizeObserver = new ResizeObserver(() => {
                window.requestAnimationFrame(() => {
                    scaleX = canvasRef.width / canvasRef.offsetWidth
                    scaleY = canvasRef.height / canvasRef.offsetHeight
                })
            });
            resizeObserver.observe(canvasRef)

            // Add Mouse events' listeners
            canvasRef.addEventListener("mousedown", (e) => { mouseDownHandler(e, scaleX, scaleY) }, false)
            canvasRef.addEventListener("mouseup", (e) => { mouseUpHandler(e, scaleX, scaleY) }, false)
            canvasRef.addEventListener("mousemove", (e) => { mouseMoveHandler(e, scaleX, scaleY) }, false)
            canvasRef.addEventListener("wheel", (e) => { wheelHandler(e, scaleX, scaleY) }, false)

            // Add Keyboard events' listeners
            window.addEventListener("keydown", keyDownHandler, false)
            window.addEventListener("keyup", keyUpHandler, false)
        })

        onBeforeUnmount(()=>{
            let canvasRef = canvas.value
            let scaleX = canvasRef.width / canvasRef.offsetWidth
            let scaleY = canvasRef.height / canvasRef.offsetHeight

            // Remove Mouse events' listeners
            canvasRef.removeEventListener("mousedown", (e) => { mouseDownHandler(e, scaleX, scaleY) }, false)
            canvasRef.removeEventListener("mouseup", (e) => { mouseUpHandler(e, scaleX, scaleY) }, false)
            canvasRef.removeEventListener("mousemove", (e) => { mouseMoveHandler(e, scaleX, scaleY) }, false)
            canvasRef.removeEventListener("wheel", (e) => { wheelHandler(e, scaleX, scaleY) }, false)

            // Remove Keyboard events' listeners
            window.removeEventListener("keydown", keyDownHandler, false)
            window.removeEventListener("keyup", keyUpHandler, false)
        })

        return {
            gamma,
            canvas,
            store,
            currentLevel,
            lower,
            upper,
            lHandler,
            uHandler,
            rgbToHex,
            updateColor,
            updateVisibility,
        }
    },
}

</script>

<style scoped>
div {
    width: 100%;
}

.flexLayout {
    border-top: 1px solid #DCDFE6;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #DCDFE6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #000000;
}

.wrapper {
    width: 100%;
    height: calc(100% - 80px);
    text-align: center;
}

.imageContainer {
    width: auto;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
}

.constrast {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    background-color: #313131;
}

.constrast > .el-slider {
    width: 47%;
}

.el-slider {
    width: 96%;
    height: 40px;
    background-color: #313131;
}

.channelBar {
    float: right;
    width: auto; 
    margin-top: 1px;
    margin-right: 1px;
}

.channel {
    display: flex; 
    flex-direction: column; 
    align-items: end; 
    width: auto;
}

/* Remove the input spinner */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>