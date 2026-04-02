<script setup lang="ts">
import LogsListItem from '@/components/LogsListItem.vue'
import { logsRepository } from '@/repositories/repositoryProvider'
import type { DisplayableLog } from '@/types/traininglog'
import { onMounted, ref } from 'vue'

const logs = ref<DisplayableLog[]>([])
onMounted(async () => {
  logs.value = await logsRepository.getAll()
})
</script>

<template>
  <h1>Logs list</h1>
  <LogsListItem v-for="log in logs" :training="log" :key="log.id"></LogsListItem>
</template>

<style scoped></style>
