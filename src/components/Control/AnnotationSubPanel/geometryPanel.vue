<template>
  <el-card>
    <template #header>
      <div class="cardHeader">
        <span>{{ $t('annotation.geometry.title') }}</span>
        <el-button
          id="advancedBtn"
          :text="true"
          @click="advanced = true"
        >
          {{ $t('annotation.geometry.advanced.btn') }}
        </el-button>
      </div>
    </template>
    <el-form
      label-position="left"
      label-width="auto"
      size="small"
      style="min-width: 300px;"
    >
      <el-form-item :label="$t('annotation.geometry.block_size')">
        <div style="display: flex;">
          <el-select
            v-model="blockSizeIndex"
            @change="updateBlockSize"
          >
            <el-option
              v-for="(item, index) in blockSizes"
              :key="index"
              :label="item.label"
              :value="index"
            />
          </el-select>
          <input
            type="number"
            :value="width"
            class="el-input el-input--small"
            :readonly="bReadonly"
            @change="updateBlockSize_width"
          >
          <input
            type="number"
            :value="height"
            class="el-input el-input--small"
            :readonly="bReadonly"
            @change="updateBlockSize_height"
          >
        </div>
      </el-form-item>
      <el-form-item :label="$t('annotation.geometry.center')">
        <div style="display: flex;">
          <input
            type="number"
            min="0"
            :value="center.x"
            class="el-input el-input--small"
            @change="(event) => store.dispatch('core/updateCenter', {'x': parseInt(event.target.value), 'y': center.y, 'z': center.z})"
          >
          <input
            type="number"
            min="0"
            :value="center.y"
            class="el-input el-input--small"
            @change="(event) => store.dispatch('core/updateCenter', {'x': center.x, 'y': parseInt(event.target.value), 'z': center.z})"
          >
          <input
            type="number"
            min="0"
            :value="center.z"
            class="el-input el-input--small"
            @change="(event) => store.dispatch('core/updateCenter', {'x': center.x, 'y': center.y, 'z': parseInt(event.target.value)})"
          >
        </div>
      </el-form-item>
    </el-form>
  </el-card>

  <!-- Advanced dialog -->
  <el-dialog
    v-model="advanced"
    :title="$t('annotation.geometry.advanced.title')"
    style="max-width: 600px;"
  >
    <el-form
      :model="advancedForm"
      label-position="left"
      label-width="auto"
    >
      <el-form-item :label="$t('annotation.geometry.advanced.syn')">
        <el-select
          v-model="advancedForm.syn"
          placeholder="None"
          size="middle"
        >
          <el-option
            v-for="(item, index) in synOptions"
            :key="index"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('annotation.geometry.advanced.voxel_size')">
        <el-input v-model="advancedForm.voxel_size.x" />
        <el-input v-model="advancedForm.voxel_size.y" />
        <el-input v-model="advancedForm.voxel_size.z" />
      </el-form-item>
      <el-form-item :label="$t('annotation.geometry.advanced.position')">
        <el-input v-model="advancedForm.position.x" />
        <el-input v-model="advancedForm.position.y" />
        <el-input v-model="advancedForm.position.z" />
      </el-form-item>
    </el-form>
    <button
      style="width: 80%;"
      @click="adUpdateAction"
    >
      {{ $t('annotation.geometry.advanced.update') }}
    </button>
  </el-dialog>
</template>

<script>
import { computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'GeometryPanel',
    props: {
    },
    setup() {
        let store = useStore();
        let advanced = ref(false);
        // Block size
        let blockSizeIndex = ref(3);

        const blockSizes = [
            { label: '64x64x64', value: { width: 64, height: 64 } },
            { label: '128x128x128', value: { width: 128, height: 128 } },
            { label: '256x256x128', value: { width: 256, height: 128 } },
            { label: '256x256x256', value: { width: 256, height: 256 } },
            { label: '512x512x128', value: { width: 512, height: 128 } },
            { label: '512x512x256', value: { width: 512, height: 256 } },
            { label: '512x512x512', value: { width: 512, height: 512 } },
            { label: '1024x1024x128', value: { width: 1024, height: 128 } },
            { label: '1024x1024x256', value: { width: 1024, height: 256 } },
            { label: '1024x1024x512', value: { width: 1024, height: 512 } },
            { label: '1024x1024x1024', value: { width: 1024, height: 1024 } },
            { label: '2048x2048x64', value: { width: 2048, height: 64 } },
            { label: '2048x2048x128', value: { width: 2048, height: 128 } },
            { label: '2048x2048x256', value: { width: 2048, height: 256 } },
            { label: '2048x2048x300', value: { width: 2048, height: 300 } },
            { label: '2048x2048x512', value: { width: 2048, height: 512 } },
            { label: '2048x2048x1024', value: { width: 2048, height: 1024 } },
            { label: '4096x4096x32', value: { width: 4096, height: 32 } },
            { label: '4096x4096x64', value: { width: 4096, height: 64 } },
            { label: 'custom', value: { width: 0, height: 0 } }
        ];

        let bReadonly = computed(() => blockSizeIndex.value !== blockSizes.length - 1);
        
        let width = computed(
            () => {
                if(!bReadonly.value){
                    return store.state.core.blockSize.width;
                }else{
                    return blockSizes[blockSizeIndex.value].value.width;
                }
            },
        );

        let height = computed(
            () => {
                if(!bReadonly.value){
                    return store.state.core.blockSize.height;
                }else{
                    return blockSizes[blockSizeIndex.value].value.height;
                }
            },
        );

        function updateBlockSize(index){
            if(index !== blockSizes.length -1){
                store.dispatch('core/updateBlockSize', blockSizes[index].value)
            }
        }

        function updateBlockSize_width(event) {
            if(!bReadonly.value){
                store.dispatch('core/updateBlockSize', { "width": parseInt(event.target.value), "height": store.state.core.blockSize.height })
            }
        }

        function updateBlockSize_height(event) {
            if(!bReadonly.value){
                store.dispatch('core/updateBlockSize', { "width": store.state.core.blockSize.width, "height": parseInt(event.target.value) })
            }
        }

        // Center
        let center = computed(() => store.state.core.center)

        let synOptions = ['None', 'x-y-z', 'x-y']
        let advancedForm = reactive({
          syn: '',
          voxel_size: {
            x: 1,
            y: 1,
            z: 1
          },
          position: {
            x: 0,
            y: 0,
            z: 0
          }
        })

        function adUpdateAction() {

        }

        return {
            store,
            advanced,
            width,
            height,
            bReadonly,
            blockSizeIndex,
            blockSizes,
            updateBlockSize,
            updateBlockSize_width,
            updateBlockSize_height,
            center,
            synOptions,
            advancedForm,
            adUpdateAction
        }
    }
}
</script>

<style scoped>

</style>