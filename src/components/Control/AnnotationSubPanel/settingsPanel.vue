<template>
  <el-card shadow="never">
    <template #header>
      <div class="cardHeader">
        <span>{{ $t('annotation.settings.title') }}</span>
      </div>
    </template>
    <el-form
      label-position="left"
      label-width="auto"
      size="small"
      style="min-width: 300px;"
    >
      <el-form-item :label="$t('annotation.settings.annotation_channel')">
        <el-select>
          <el-option
            label="通道1"
            value="1"
          />
          <el-option
            label="通道2"
            value="2"
          />
          <el-option
            label="通道3"
            value="3"
          />
          <el-option
            label="通道4"
            value="4"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('annotation.settings.annotation_type')">
        <el-select>
          <el-option
            :label="$t('annotation.type.line')"
            value="line"
          />
          <el-option
            :label="$t('annotation.type.point')"
            value="point"
          />
          <el-option
            :label="$t('annotation.type.moveSelectedNode')"
            value="moveSelectedNode"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('annotation.settings.slice_thickness')">
        <el-input />
      </el-form-item>
      <el-form-item :label="$t('annotation.settings.user_name')">
        <el-input />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
    name: 'SettingsPanel',
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