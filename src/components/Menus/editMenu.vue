<!-- Edit menu -->
<template>
  <el-sub-menu :index="index">
    <template #title>
      {{ $t('edit.title') }}
    </template>
    <el-menu-item index="2-1">
      {{ $t('edit.move_slice_by_node') }}
    </el-menu-item>
    <el-menu-item index="2-2">
      {{ $t('edit.move_selected_node') }}
    </el-menu-item>
    <el-divider class="hLine" />
    <el-menu-item index="2-3">
      {{ $t('edit.create_anchor_nodes') }}
    </el-menu-item>
    <el-sub-menu index="2-4">
      <template #title>
        {{ $t('edit.delete_nodes.title') }}
      </template>
      <el-menu-item index="2-4-1">
        {{ $t('edit.delete_nodes.selected_node') }}
      </el-menu-item>
      <el-menu-item index="2-4-2">
        {{ $t('edit.delete_nodes.all_nodes_on_selected_fiber') }}
      </el-menu-item>
      <el-menu-item index="2-4-3">
        {{ $t('edit.delete_nodes.all_nodes_of_selected_type') }}
      </el-menu-item>
      <el-menu-item index="2-4-4">
        {{ $t('edit.delete_nodes.all_nodes') }}
      </el-menu-item>
    </el-sub-menu>
    <el-divider class="hLine" />
    <el-menu-item index="2-5">
      {{ $t('edit.build_node_groups') }}
    </el-menu-item>
    <el-menu-item index="2-6">
      {{ $t('edit.review_nodes') }}
    </el-menu-item>
    <el-menu-item index="2-7">
      {{ $t('edit.move_to_pending_node') }}
    </el-menu-item>
  </el-sub-menu>
</template>

<script>
export default {
  name: 'EditMenu',
  props: {
    index: {
      type: Number,
      default: 2
    }
  },
  setup() {
  }
}
</script>

<style>

</style>