<template>
  <el-card>
    <template #header>
      <div class="cardHeader">
        <span>{{ $t('annotation.special_nodes.title') }}</span>
        <div>
          <el-button
            id="filterBtn"
            :text="true"
            @click="filter = true"
          >
            {{ $t('annotation.special_nodes.filter.btn') }}
          </el-button>
          <el-button
            id="popBtn"
            :text="true"
            @click="popUp = true"
          >
            {{ $t('annotation.special_nodes.pop') }}
          </el-button>
        </div>
      </div>
    </template>
    <nodesTable v-show="!popUp"></nodesTable>
  </el-card>
  
  <!-- Filter dialog -->
  <el-dialog v-model="filter" :title="$t('annotation.special_nodes.filter.title')" style="max-width: 600px;" draggable="true" overflow="true">
    <div class="filters">
      <form id="includesForm">
        <p style="text-align: left;">{{ $t('annotation.special_nodes.filter.includes') }}</p>
        <label v-for="it in types" style="display: flex;">
          <input type="checkbox" v-model="includesList" :value="it"/>
          {{ $t('annotation.special_nodes.filter.types.' + it) }}
        </label>
        <input type="text" :value="it" :placeholder="$t('annotation.special_nodes.filter.types.custom')"/>
      </form>
      <form id="excludesForm">
        <p style="text-align: left;">{{ $t('annotation.special_nodes.filter.excludes') }}</p>
        <label v-for="it in types" style="display: flex;">
          <input type="checkbox" name="excludes" v-model="excludesList" :value="it"/>
          {{ $t('annotation.special_nodes.filter.types.' + it) }}
        </label>
        <input type="text" :value="it" :placeholder="$t('annotation.special_nodes.filter.types.custom')"/>
      </form>
    </div> 
    <div class="filters" style="margin-top: 4px;">
      <button type="reset" form="includesForm" @click="includesList=[]">{{ $t('annotation.special_nodes.filter.reset_includes') }}</button>
      <button type="reset" form="excludesForm" @click="excludesList=[]">{{ $t('annotation.special_nodes.filter.reset_excludes') }}</button>
      <button @click="filterNodes">{{ $t('annotation.special_nodes.filter.apply') }}</button>
    </div>
  </el-dialog>

  <!-- Pop up dialog -->
   <el-dialog v-model="popUp" :title="$t('annotation.special_nodes.title')" draggable="true" overflow="true">
    <nodesTable></nodesTable>
   </el-dialog>
</template>

<script>
import nodesTable from '../../UI/nodesTable.vue';
import { ref } from 'vue';

export default {
    name: 'SpecialNodePanel',
    props: {
    },
    components: {
      nodesTable
    },
    setup() {
      let filter = ref(false);
      let popUp = ref(false);
      let types = ['soma', 'axon_node', 'apical_node', 'branch_node', 'terminal', 'missing_end', 'error_node', 'anchor', 'unsure', 'verified'];
      let includesList = ref([]);
      let excludesList = ref([]);

      function filterNodes(){
        console.log('filtering nodes');
      }

        return {
          filter,
          popUp,
          types,
          includesList,
          excludesList,
          filterNodes
        }
    }
}
</script>

<style scoped>
.filters{
  display: flex;
  justify-content: space-around;
}

</style>