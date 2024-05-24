<!-- Status bar -->
<template>
  <label
    v-if="store.state.status.bShow"
    id="statusBar"
  >{{ store.state.status.message }}</label>
</template>

<script>
import { useStore } from 'vuex'

export default {
    name: 'StatusBar',
    setup() {
        const store = useStore()

        return {
            store
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#statusBar {
    margin: 0px;
    padding: 0px;
    border: 0px;
    background-color: #313131;
    color: greenyellow;
    font-size: 18px;
    height: 30px;
    line-height: 30px;
}
</style>
  