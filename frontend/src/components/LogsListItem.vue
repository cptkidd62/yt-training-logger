<script lang="ts">
import type { DisplayableLog } from '@/types/traininglog'
import { defineComponent, type PropType } from 'vue'
export default defineComponent({
  props: {
    training: {
      type: Object as PropType<DisplayableLog>,
      required: true,
    },
  },
})
</script>

<template>
  <div class="logs-list-item">
    <RouterLink :to="`/trainings/${training.id}`"
      ><h3 class="id">{{ training.trainingTitle }}</h3></RouterLink
    >
    <p>{{ new Date(training.date).toLocaleDateString() }}</p>
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
