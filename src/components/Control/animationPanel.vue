<template>
  <div class="panelContainer">
    <keyframeSettingsPanel :name="5" />
    <allKeyfamesPanel :name="6" />
    <allFramesPanel :name="7" />
    <scriptPanel :name="8" />
  </div>
</template>

<script>
import keyframeSettingsPanel from './AnimationSubPanel/keyframeSettingsPanel.vue'
import allKeyfamesPanel from './AnimationSubPanel/allKeyfamesPanel.vue'
import allFramesPanel from './AnimationSubPanel/allFramesPanel.vue'
import scriptPanel from './AnimationSubPanel/scriptPanel.vue'

export default {
    name: 'AnimationPanel',
    components: {
        keyframeSettingsPanel,
        allKeyfamesPanel,
        allFramesPanel,
        scriptPanel
    },
    setup() {
    }
}
</script>

<style>

</style>