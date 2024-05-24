<!-- Main page -->
<template>
  <el-container direction="vertical">
    <appHeader />
    <div class="split">
      <div id="split-0">
        <viewerPanel />
      </div>
      <div id="split-1">
        <controlPanel />
      </div>
    </div>
  </el-container>
</template>

<script>
import appHeader from './appHeader.vue'
import controlPanel from './controlPanel.vue'
import viewerPanel from './viewerPanel.vue'
import Split from 'split.js'

export default {
  name: 'MainPage',
  components: {
    appHeader,
    controlPanel,
    viewerPanel,
  },
  mounted() {
    Split(['#split-0', '#split-1'], {
      sizes: [70, 30],
      minSize: 300,
      gutterSize: 1,
      direction: 'horizontal',
      cursor: 'col-resize',
    })
  },
}
</script>

<style scoped>
.split {
    display: flex;
    flex-direction: row;
    height: calc(100vh - 30px);
    width: 100vw;
}
</style>
