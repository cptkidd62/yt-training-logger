<script setup lang="ts">
import { toLocaleDateString } from '@/helpers/DateTools'
import { plansRepository } from '@/repositories/repositoryProvider'
import router from '@/router'
import type { TrainingPlanView } from '@/types/trainingplan'
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
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="plan" class="plan-full">
    <h1>{{ plan.title }}</h1>
    <p>{{ toLocaleDateString(plan.createdAt) }}</p>
  </div>
</template>

<style scoped>
.plan-full {
  display: flex;
  flex-flow: column;
  margin-bottom: 1rem;
}
</style>
