<script setup lang="ts">
import { toLocaleDateString } from '@/helpers/DateTools'
import { plansRepository } from '@/repositories/repositoryProvider'
import router from '@/router'
import { planViewToRaw, type TrainingPlanView } from '@/types/trainingplan'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const plan = ref<TrainingPlanView | undefined>(undefined)
const loading = ref(true)

const route = useRoute()
onMounted(async () => {
  const id = route.params.id as string
  const id_num = Number.parseInt(id)
  plan.value = await plansRepository.getByID(id_num)
  console.log('Training: ' + plan.value)
  if (plan.value === undefined) {
    router.push('/')
  }
  loading.value = false
})

function addWeek() {
  plan.value!.weeks.push([])
  plansRepository.update(plan.value!.id, planViewToRaw(plan.value!))
}

function deleteWeek(idx: number) {
  if (confirm('Do you really want to delete this week?')) {
    plan.value!.weeks.splice(idx, 1)
    plansRepository.update(plan.value!.id, planViewToRaw(plan.value!))
  }
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="plan" class="plan-full">
    <h1>{{ plan.title }}</h1>
    <p>{{ toLocaleDateString(plan.createdAt) }}</p>
    <details v-for="(week, idx) in plan.weeks" :key="idx">
      <summary>Week {{ idx + 1 }}</summary>
      <button @click="deleteWeek(idx)">Delete week</button>
    </details>
    <button @click="addWeek">Add week</button>
  </div>
</template>

<style scoped>
.plan-full {
  display: flex;
  flex-flow: column;
  margin-bottom: 1rem;
}
</style>
