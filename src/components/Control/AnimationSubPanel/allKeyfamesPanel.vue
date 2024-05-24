<template>
  <el-card>
    <template #header>
      <div class="cardHeader">
        <span>{{ $t('animation.all_keyframes.title') }}</span>
      </div>
    </template>
    <el-table
      border
      label-position="left"
      label-width="auto"
      size="small"
      style="min-width: 300px;"
    >
      <el-table-column :label="$t('animation.all_keyframes.index')" />
      <el-table-column :label="$t('animation.all_keyframes.created_time')" />
      <el-table-column :label="$t('animation.all_keyframes.notes')" />
    </el-table>
  </el-card>
</template>

<script>
export default {
    name: 'AllKeyfamesPanel',
    props: {
    },
    setup() {
        return {
        }
    }
}
</script>

<style>

</style>