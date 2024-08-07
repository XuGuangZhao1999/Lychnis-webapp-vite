<!-- Control panel -->
<template>
  <el-tabs
    class="tabs"
    type="border-card"
    stretch="true"
  >
    <el-tab-pane :label="$t('annotation.title')">
      <annotationPanel />
    </el-tab-pane>
    <el-tab-pane :label="$t('animation.title')">
      <animationPanel />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import annotationPanel from './Control/annotationPanel.vue'
import animationPanel from './Control/animationPanel.vue'

export default {
    name: 'ControlPanel',
    components: {
        annotationPanel,
        animationPanel
    },
    setup() {

    }
}
</script>

<style>
.tabs {
    height: 100%;
    margin: 0px;
    border: 0px;
    padding: 0px;
}

.panelContainer {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.cardHeader {
    height: 30px;
    display: flex;
    justify-content: space-between;
}

span {
    display: flex;
    align-items: center;
    font-size: 14px;
}

span.el-table__empty-text {
    justify-content: center;
}

.el-select__wrapper {
    background-color: #313131 !important;
    color: white !important;
    height: 100%;
}

.el-table {
    --el-table-bg-color: #3c3c3c !important;
}

.el-table th.el-table__cell {
    background-color: #3c3c3c !important;
}

.el-table thead {
    color: white !important;
}

.el-tabs__item{
    background-color: #3c3c3c !important;
    color: white !important;
    border-top: 2px solid #FFFFFF !important;
    border-bottom: 1px solid #FFFFFF !important;
}

.el-tabs__item.is-active {
    background-color: #313131 !important;
    border-top: 2px solid #f88070 !important;
}

.el-tabs__content {
    background-color: #313131 !important;
    color: white !important;
    height: calc(100% - 40px) !important;
    margin: 0px !important;
    border: 0px !important;
    padding: 0px !important;
}

.el-card {
    background-color: #313131 !important;
    color: white !important;
    --el-card-padding: 0px !important;
    border-bottom: 1px solid !important;
    --el-card-border-radius: 0px !important;
}

.el-form {
    background-color: #313131;
}

.el-form-item {
    background-color: #313131;
}

.el-form-item__label {
    color:white !important;
}

.el-form-item--small{
    margin-bottom: 1px !important;
}

.el-input__wrapper {
    background-color: #313131 !important;
}

.el-input__inner {
    color: white !important;
}

input {
    background-color: #313131;
    color: white;
    border: #FFFFFF 1px solid;
    border-radius: 4px;
}

.el-button.is-text {
    color: rgb(170, 199, 104) !important;
}

.el-dialog {
    background-color: #313131 !important;
    color: white !important;
}

.el-dialog__title {
    color: white !important;
}

.el-dialog__body {
    color: white !important;
}

</style>
