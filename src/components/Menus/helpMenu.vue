<!-- Help menu -->
<template>
  <el-sub-menu :index="index">
    <template #title>
      {{ $t('help.title') }}
    </template>
    <el-menu-item
      id="debug"
      index="4-1"
      @click="about()"
    >
      {{ $t('help.about') }}
    </el-menu-item>
    <el-sub-menu index="4-2">
      <template #title>
        {{ $t('help.language') }}
      </template>
      <el-menu-item
        index="4-2-1"
        @click="changeLanguage('zhCn')"
      >
        简体中文
      </el-menu-item>
      <el-menu-item
        index="4-2-2"
        @click="changeLanguage('en')"
      >
        English
      </el-menu-item>
    </el-sub-menu>
  </el-sub-menu>
</template>
 
 <script>
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'HelpMenu',
  props: {
    index: {
      type: Number,
      default: 4
    }
  },
  setup() {
    const store = useStore()

    // About the App
    function about() {
      let info = "Lychnis is a fiber-tracing tool for volumetric data.<br/>" + 
                 "Developed and maintained by SMART/VISoR team (at SIAT and USTC).<br/>" +
                 "Contact: <a href='mailto:dinglufe@gmail.com'>dinglufe@gmail.com</a>"
                  
      ElMessageBox.alert(info, 'About', {
        confirmButtonText: 'OK',
        type: 'info',
        dangerouslyUseHTMLString: true,
        callback: ()=> {
          store.commit("status/showMessage", "Close about!")
        }
      })
    }

    // I18n
    function changeLanguage(lang) {
      store.commit('core/setLanguage', lang);
      store.commit('core/setI18N', lang);
    }

    return {
      about,
      changeLanguage,
      store
    }
  }
}
 </script>
 
 <style>
 
 </style>