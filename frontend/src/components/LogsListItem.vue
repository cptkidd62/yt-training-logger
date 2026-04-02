<script lang="ts">
import { toLocaleFullString } from '@/helpers/DateTools'
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
    }
  },
})
</script>

<template>
  <div class="logs-list-item">
    <RouterLink :to="`/trainings/${training.id}`"
      ><h3 class="id">{{ training.trainingTitle }}</h3></RouterLink
    >
    <p>{{ toLocaleFullString(training.date) }}</p>
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
