<template>
  <el-card>
    <template #header>
      <div class="cardHeader">
        <span>{{ $t('annotation.selected_node.title') }}</span>
      </div>
    </template>
    <el-form
      label-position="left"
      label-width="auto"
      size="small"
      style="min-width: 300px;"
    >
      <el-form-item :label="$t('annotation.selected_node.node_id')">
        <div style="display: flex;">
          <el-input />
          <el-input :placeholder="$t('placeholder.searchNodeId')" />
        </div>
      </el-form-item>
      <el-form-item :label="$t('annotation.selected_node.node_type')">
        <el-select>
          <el-option
            label="None"
            value="1"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('annotation.selected_node.message')">
        <div style="display: flex;">
          <el-input :placeholder="$t('placeholder.pressEnter')" />
          <el-select>
            <el-option
              label="Sure"
              value="1"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item :label="$t('annotation.selected_node.creator')">
        <el-input type="text" />
      </el-form-item>
      <el-form-item :label="$t('annotation.selected_node.color')">
        <div style="display: flex;">
          <el-input type="text" />
          <el-color-picker v-model="nodeColor" />
        </div>
      </el-form-item>
      <el-form-item :label="$t('annotation.selected_node.coordinate')">
        <el-input type="text" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
    name: 'CurrentNodeInfoPanel',
    setup() {
        const nodeColor = '#00FF00'
        return {
            nodeColor
        }
    }
}
</script>

<style scoped>

</style>