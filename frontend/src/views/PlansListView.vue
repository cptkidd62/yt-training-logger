<script setup lang="ts">
import PlansListItem from '@/components/PlansListItem.vue'
import { plansRepository } from '@/repositories/repositoryProvider'
import router from '@/router'
import type { TrainingPlanView } from '@/types/trainingplan'
import { onMounted, ref } from 'vue'

const plans = ref<TrainingPlanView[]>([])
onMounted(async () => {
  plans.value = await plansRepository.getAll()
})

async function newPlan() {
  let title = prompt('Please enter new training plan title', 'New plan')
  title = title == null ? 'New plan' : title
  plansRepository.add({
    title: title,
    description: '',
    weeks: [],
    createdAt: new Date().getTime(),
  })
  router.go(0)
}
</script>

<template>
  <h1>Plans list</h1>
  <PlansListItem v-for="plan in plans" :plan="plan" :key="plan.id" />
  <button @click="newPlan">Add new plan</button>
</template>

<style scoped></style>
