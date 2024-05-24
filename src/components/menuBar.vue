<!-- Menu bar -->
<template>
  <el-menu
    id="menu"
    mode="horizontal"
    background-color="#313131"
    text-color="#FFFFFF"
  >
    <fileMenu :index="1" />
    <editMenu :index="2" />
    <viewMenu :index="3" />
    <helpMenu :index="4" />
    <el-menu-item index="5">
      <statusBar />
    </el-menu-item>
  </el-menu>
</template>
  
<script>
import statusBar from './statusBar.vue'
import fileMenu from './Menus/fileMenu.vue'
import editMenu from './Menus/editMenu.vue'
import viewMenu from './Menus/viewMenu.vue'
import helpMenu from './Menus/helpMenu.vue'

export default {
  name: 'MenuBar',
  components: {
    fileMenu,
    editMenu,
    viewMenu,
    helpMenu,
    statusBar
  },
  setup() {
  },
}
</script>

<style>
#menu {
  margin: 0px;
  padding: 0px;
  border: 0px;
  height: 30px;
}

.hLine {
  margin: 0px !important;
}
</style>
  