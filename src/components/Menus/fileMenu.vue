<!-- File menu -->
<template>
  <el-sub-menu :index="index">
    <template #title>
      {{ $t('file.title') }}
    </template>
    <el-menu-item
      index="1-1"
      @click="loadProject()"
    >
      {{ $t('file.load_project') }}
    </el-menu-item>
    <el-menu-item
      index="1-2"
      @click="saveProject()"
    >
      {{ $t('file.save') }}
    </el-menu-item>
    <el-menu-item index="1-3">
      {{ $t('file.save_as') }}
    </el-menu-item>
    <el-divider class="hLine" />
    <el-menu-item
      index="1-4"
      @click="openImage()"
    >
      {{ $t('file.open_image_file') }}
    </el-menu-item>
    <el-menu-item index="1-5">
      {{ $t('file.open_image_as_sps') }}
    </el-menu-item>
    <el-menu-item
      index="1-6"
      @click="importNodes()"
    >
      {{ $t('file.import_nodes') }}
    </el-menu-item>
    <el-menu-item index="1-7">
      {{ $t('file.import_parameters') }}
    </el-menu-item>
    <el-menu-item index="1-8">
      {{ $t('file.show_image_information') }}
    </el-menu-item>
    <el-divider class="hLine" />
    <el-sub-menu index="1-9">
      <template #title>
        {{ $t('file.export_nodes.title') }}
      </template>
      <el-menu-item index="1-9-1">
        {{ $t('file.export_nodes.imaris_format') }}
      </el-menu-item>
      <el-menu-item
        index="1-9-2"
        @click="exportNodes('lyp')"
      >
        {{ $t('file.export_nodes.lychnis_format') }}
      </el-menu-item>
      <el-menu-item
        index="1-9-3"
        @click="exportNodes('swc')"
      >
        {{ $t('file.export_nodes.swc_format') }}
      </el-menu-item>
      <el-menu-item index="1-9-4">
        {{ $t('file.export_nodes.imaris_spots') }}
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="1-10">
      {{ $t('file.export_animation') }}
    </el-menu-item>
    <el-menu-item index="1-11">
      {{ $t('file.export_volume') }}
    </el-menu-item>
  </el-sub-menu>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'FileMenu',
  props: {
    index: {
      type: Number,
      default: 1
    }
  },
  setup() {
    const store = useStore()

    function loadProject() {
      let req = {
        "functionName": "loadProject",
        "args": {}
      }

      window.cefQuery({
        request: JSON.stringify(req),
        onSuccess: function(response) {
          // Set the flag to indicate that the project has been loaded.
          store.commit('core/setBLoaded', true)
          // Load project success, paint response data to canvas.
          window.showMessage("loadProject: " + response);
        },
        onFailure: function(error_code, error_message) {
          // Load project failed, output error message to statusBar.
          window.showMessage(error_code + ": " + error_message)
        }
      })
    }

    function saveProject() {
      let req = {
        "functionName": "saveProject",
        "args": {}
      }

      window.cefQuery({
        request: JSON.stringify(req),
        onSuccess: function(response) {
          // Save project success.
          window.showMessage("saveProject: " + response);
        },
        onFailure: function(error_code, error_message) {
          // Save project failed, output error message to statusBar.
          window.showMessage(error_code + ": " + error_message)
        }
      })
    }

    function openImage() {
      let req = {
        "functionName": "openImage",
        "args": {}
      }

      window.cefQuery({
        request: JSON.stringify(req),
        onSuccess: function(response) {
          // Open image success.
          window.showMessage("openImage: " + response);
          store.commit('core/setBLoaded', true)
        },
        onFailure: function(error_code, error_message) {
          // Open image failed, output error message to statusBar.
          window.showMessage(error_code + ": " + error_message)
        }
      })
    }

    function importNodes(format) {
      let req = {
        "functionName": "importNodes",
        "args": {
          "format": format
        }
      }

      window.cefQuery({
        request: JSON.stringify(req),
        onSuccess: function(response) {
          // Import nodes success.
          window.showMessage("importNodes: " + response);
        },
        onFailure: function(error_code, error_message) {
          // Import nodes failed, output error message to statusBar.
          window.showMessage(error_code + ": " + error_message)
        }
      })
    }

    function exportNodes(format) {
      let req = {
        "functionName": "exportNodes",
        "args": {
          "format": format
        }
      }

      window.cefQuery({
        request: JSON.stringify(req),
        onSuccess: function(response) {
          // Export nodes success.
          window.showMessage("exportNodes: " + response);
        },
        onFailure: function(error_code, error_message) {
          // Export nodes failed, output error message to statusBar.
          window.showMessage(error_code + ": " + error_message)
        }
      })
    }

    return { 
      store,
      loadProject,
      saveProject,
      openImage,
      importNodes,
      exportNodes,
    }
  },
}
</script>

<style>

</style>