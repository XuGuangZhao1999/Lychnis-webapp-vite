<template>
  <el-card>
    <template #header>
      <div class="cardHeader">
        <span>{{ $t('animation.script.title') }}</span>
      </div>
    </template>
    <el-form label-position="left">
      <el-form-item>
        <el-input />
        <el-button :text="true">
          {{ $t('animation.script.browse') }}
        </el-button>
      </el-form-item>
      <el-button :text="true">
        {{ $t('animation.script.export_template') }}
      </el-button>
      <el-button :text="true">
        {{ $t('animation.script.reload') }}
      </el-button>
      <el-button :text="true">
        {{ $t('animation.script.insert_current_state') }}
      </el-button>
    </el-form>
  </el-card>
</template>

<script>
export default {
    name: 'ScriptPanel',
    setup() {
        return {
        }
    }
}
</script>

<style>
.el-form-item__content {
    flex-wrap: nowrap !important;
}

</style>