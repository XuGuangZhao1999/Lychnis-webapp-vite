<template>
  <el-card>
    <template #header>
      <div class="cardHeader">
        <span>{{ $t('annotation.special_nodes.title') }}</span>
        <div>
          <el-button
            id="filterBtn"
            :text="true"
          >
            {{ $t('annotation.special_nodes.filter') }}
          </el-button>
          <el-button
            id="popBtn"
            :text="true"
          >
            {{ $t('annotation.special_nodes.pop') }}
          </el-button>
        </div>
      </div>
    </template>
    <el-table border>
      <el-table-column :label="$t('annotation.special_nodes.id')" />
      <el-table-column :label="$t('annotation.special_nodes.message')" />
    </el-table>
  </el-card>
</template>

<script>
export default {
    name: 'SpecialNodePanel',
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