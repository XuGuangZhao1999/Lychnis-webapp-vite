<template>
  <el-card>
    <template #header>
      <div class="cardHeader">
        <span>{{ $t('animation.keyframe.title') }}</span>
        <div>
          <el-button
            id="newBtn"
            :text="true"
          >
            {{ $t('animation.keyframe.new') }}
          </el-button>
          <el-button
            id="modifyBtn"
            :text="true"
          >
            {{ $t('animation.keyframe.modify') }}
          </el-button>
        </div>
      </div>
    </template>
    <el-form
      label-position="left"
      label-width="auto"
      size="small"
      style="min-width: 300px;"
    >
      <el-form-item :label="$t('animation.keyframe.index_keyframes')">
        <el-input />
      </el-form-item>
      <el-form-item :label="$t('animation.keyframe.index_all_frames')">
        <el-input />
      </el-form-item>
      <el-form-item :label="$t('animation.keyframe.created_time')">
        <el-input />
      </el-form-item>
      <el-form-item :label="$t('animation.keyframe.duration_frames')">
        <el-input placeholder="0" />
      </el-form-item>
      <el-form-item :label="$t('animation.keyframe.notes')">
        <el-input />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
    name: 'KeyframeSettingsPanel',
    setup() {
        return {
        }
    }
}
</script>

<style>

</style>