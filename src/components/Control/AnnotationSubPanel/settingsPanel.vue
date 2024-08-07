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
            v-for="index in store.state.core.channels.length"
            :key="index"
            :label="'Channel'+index"
            :value="index"
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
        <el-input v-model="user_name" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'SettingsPanel',
    props: {

    },
    setup() {
        let store = useStore();
        // let user_name = ref(store.state.core.username);
        let user_name = computed({
          get: () => store.state.core.username,
          set: (value) => store.dispatch('core/updateUsername', value)
        });

        return {
          store,
          user_name
        }
    }
}
</script>

<style>

</style>