<!-- The main component and page entry file of the Vue project. -->
<template>
  <el-config-provider :locale="store.getters['core/locale']">
    <mainPage />
  </el-config-provider>
</template>

<script>
import mainPage from './components/mainPage.vue'
import { useStore } from 'vuex';

export default {
  name: 'App',
  components: {
    mainPage
  },
  setup() {
    const store = useStore();

    document.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    })

    return {
      store
    }
  }
}
</script>

<style>
#app {
  margin: 0px;
  padding: 0px;
  border: 0px;
  height: 100vh;
  width: 100vw;
  font-family: Consolas, 'Courier New', monospace;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  user-select: none;
}
</style>
