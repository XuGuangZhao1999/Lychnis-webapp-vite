<template>
  <div
    class="color-input-wrapper"
    @click.right="updateChannelVisibility(channelIndex)"
    data-cy="color-input-wrapper"
  >
    <input
      :id="'color-input'+channelIndex"
      v-model="color"
      type="color"
      class="color-input"
      :style="isActive"
      data-cy="color-picker"
    >
    <label
      :for="'color-input'+channelIndex"
      class="color-label"
      data-cy="color-label"
    >{{ "C" + channelIndex }}</label>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
    name: 'ChannelColorSelector',
    props: {
        channelIndex: {
            type: Number,
            default: 0,
        },
        channelColor: {
            type: String,
            default: '#000000',
        },
        changeHandler: {
            type: Function,
            default: () => {},
        },
        changeVisibility: {
            type: Function,
            default: () => {},
        }
    },
    setup(props){
        let color = ref(props.channelColor)
        let visibility = ref(true)

        watch(color, (newVal) => {
            if(typeof props.changeHandler === 'function'){
              props.changeHandler(props.channelIndex, newVal)
            }
        })

        let isActive = computed(()=>{
          console.log(visibility)
          return visibility.value ? 'border-color: #00FF00' : 'border-color: #FFFFFF'
        })

        function updateChannelVisibility(channelIndex){
            if(typeof props.changeVisibility === 'function'){
              props.changeVisibility(channelIndex, !visibility.value)
              visibility.value = !visibility.value
            }
        }

        return {
          color,
          updateChannelVisibility,
          isActive,
        }
    }
}
</script>

<style scoped>
.color-input-wrapper {
  position: relative;
  display: inline-block;
  border: 0px;
  padding: 0px;
  height: 30px;
  width: 30px;
}

.color-input {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  padding: 0px;
}

.color-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
</style>