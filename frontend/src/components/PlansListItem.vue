<script lang="ts">
import { toLocaleDateString } from '@/helpers/DateTools'
import { plansRepository } from '@/repositories/repositoryProvider'
import router from '@/router'
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
      deletePlan,
    }
  },
})

function deletePlan(plan: TrainingPlanView) {
  if (confirm('Do you really want to delete this plan?')) {
    plansRepository.remove(plan.id)
    router.go(0)
  }
}
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
    <button @click="deletePlan(plan)">Delete log</button>
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

button {
  width: 5em;
  height: 3em;
  margin: 2em;
}
</style>
