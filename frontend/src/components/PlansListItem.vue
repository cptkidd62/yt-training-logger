<script lang="ts">
import { toLocaleDateString } from '@/helpers/DateTools'
import type { TrainingPlanView } from '@/types/trainingplan'
import { defineComponent, type PropType } from 'vue'
export default defineComponent({
  props: {
    plan: {
      type: Object as PropType<TrainingPlanView>,
      required: true,
    },
  },
  setup() {
    return {
      toLocaleDateString,
    }
  },
})
</script>

<template>
  <div class="plan-list-item">
    <RouterLink :to="`/plans/${plan.id}`">
      <div>
        <h3 class="id">{{ plan.title }}</h3>
        <p>Weeks: {{ plan.weeks.length }}</p>
        <p>{{ toLocaleDateString(plan.createdAt) }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.plan-list-item {
  display: flex;
  flex-flow: row;
  margin-bottom: 1rem;
}

.name {
  margin-right: 1rem;
}
</style>
