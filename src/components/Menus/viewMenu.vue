<!-- View menu -->
<template>
  <el-sub-menu :index="index">
    <template #title>
      {{ $t('view.title') }}
    </template>
    <el-menu-item index="3-1">
      {{ $t('view.show_hide_all_fibers') }}
    </el-menu-item>
    <el-menu-item index="3-2">
      {{ $t('view.show_hide_unselected_fibers') }}
    </el-menu-item>
    <el-menu-item index="3-3">
      {{ $t('view.show_hide_current_volume') }}
    </el-menu-item>
    <el-menu-item index="3-4">
      {{ $t('view.show_hide_roi_volumes') }}
    </el-menu-item>
    <el-menu-item index="3-5">
      {{ $t('view.roi_settings') }}
    </el-menu-item>
    <el-menu-item index="3-6">
      {{ $t('view.toggle_auto_loading') }}
    </el-menu-item>
    <el-menu-item index="3-7">
      {{ $t('view.display_settings') }}
    </el-menu-item>
    <el-menu-item index="3-8">
      {{ $t('view.turn_on_off_annotation_mode') }}
    </el-menu-item>
  </el-sub-menu>
</template>

<script>
export default {
  name: 'ViewMenu',
  props: {
    index: {
      type: Number,
      default: 3
    }
  },
  setup() {
  }
}
</script>

<style>

</style>