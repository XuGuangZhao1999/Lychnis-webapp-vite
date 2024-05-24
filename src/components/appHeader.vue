<!-- App header -->
<template>
  <el-header
    class="header"
    direction="horizontal"
  >
    <menuBar />
  </el-header>
</template>

<script>
import menuBar from './menuBar.vue'

export default{
    name: 'AppHeader',
    components: {
        menuBar
    }
}
</script>

<style scoped>
.header {
    margin: 0px;
    border: 0px;
    padding: 0px;
    width: 100%;
    height: 30px;
}
</style>
