<script setup lang="ts">
import { dexieExportToJSON } from '@/repositories/dexie/dexieBackups'
import { ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>()
const file = ref<File | null>()
const error = ref('')

async function exportBackup() {
  dexieExportToJSON()
  console.log('Export backup to json file')
}
async function importBackup() {
  validateField()
  console.log('Export backup to json file')
}

function onFileChanged() {
  file.value = fileInput.value?.files![0]
  console.log('Selected file', file.value)
}

function validateField() {
  error.value = file.value != null ? '' : 'Wybierz plik do wysłania'
}
</script>

<template>
  <h1>Settings</h1>
  <h3>Export</h3>
  <button @click="exportBackup">Export backup to JSON</button>
  <h3>Import</h3>
  <input
    type="file"
    name="import_file"
    id="import_file"
    ref="fileInput"
    v-on:change="onFileChanged"
    @blur="validateField"
  />
  <p v-if="error !== ''">{{ error }}</p>
  <button @click="importBackup">Import backup from JSON</button>
</template>

<style scoped></style>
