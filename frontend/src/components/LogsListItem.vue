<script lang="ts">
import { toLocaleFullString } from '@/helpers/DateTools'
import { logsRepository } from '@/repositories/repositoryProvider'
import router from '@/router'
import type { DisplayableLog } from '@/types/traininglog'
import { defineComponent, type PropType } from 'vue'
export default defineComponent({
  props: {
    training: {
      type: Object as PropType<DisplayableLog>,
      required: true,
    },
  },
  setup() {
    return {
      toLocaleFullString,
      deleteLog,
    }
  },
})

function deleteLog(log: DisplayableLog) {
  if (confirm('Do you really want to delete this training?')) {
    logsRepository.remove(log.id)
    router.go(0)
  }
}
</script>

<template>
  <div class="logs-list-item">
    <RouterLink :to="`/logs/${training.id}`"
      ><h3 class="id">{{ training.trainingTitle }}</h3></RouterLink
    >
    <p>{{ toLocaleFullString(training.date) }}</p>
    <button @click="deleteLog(training)">Delete log</button>
  </div>
</template>

<style scoped>
.logs-list-item {
  display: flex;
  flex-flow: column;
  margin-bottom: 1rem;
}

.name {
  margin-right: 1rem;
}
</style>
