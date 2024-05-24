<!-- Annotation panel -->
<template>
  <div class="panelContainer">
    <settingsPanel />
    <geometryPanel />
    <currentNodeInfoPanel />
    <specialNodePanel />
  </div>
</template>

<script>
import settingsPanel from './AnnotationSubPanel/settingsPanel.vue'
import geometryPanel from './AnnotationSubPanel/geometryPanel.vue'
import currentNodeInfoPanel from './AnnotationSubPanel/currentNodeInfoPanel.vue'
import specialNodePanel from './AnnotationSubPanel/specialNodePanel.vue'

export default {
    name: 'AnnotationPanel',
    components: {
        settingsPanel,
        geometryPanel,
        currentNodeInfoPanel,
        specialNodePanel
    },
    setup() {
    }
}
</script>

<style scoped>

</style>