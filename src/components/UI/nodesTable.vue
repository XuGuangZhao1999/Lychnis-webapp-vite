<template>
    <el-table border>
      <el-table-column :label="$t('annotation.special_nodes.id')" />
      <el-table-column :label="$t('annotation.special_nodes.message')" />
    </el-table>
</template>

<script>
export default{
    name: 'nodesTable',
    props: {

    },
    setup(props){
        
    }
}
</script>

<style>

</style>