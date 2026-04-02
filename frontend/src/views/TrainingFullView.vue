<script setup lang="ts">
import { logsRepository, trainingRepository } from '@/repositories/repositoryProvider'
import router from '@/router'
import type { Training } from '@/types/training'
import { TrainingLog } from '@/types/traininglog'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const training = ref<Training | undefined>(undefined)
const loading = ref(true)

const route = useRoute()
onMounted(async () => {
  training.value = await trainingRepository.getByID(route.params.id as string)
  console.log('Training: ' + training.value)
  if (training.value === undefined) {
    router.push('/')
  }
  loading.value = false
})

function deleteTraining() {
  if (confirm('Do you really want to delete this training?')) {
    trainingRepository.remove(training.value!.id)
    router.push('/')
  }
}

async function recordTraining() {
  const res = await logsRepository.add(new TrainingLog(training.value!.id, Date.now(), Date.now()))
  if (res === undefined) {
    alert('Record failed... :(\nPlease, try again')
  } else {
    alert('Record successful! :)')
  }
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else class="training-full">
    <h1>{{ training!.title }}</h1>
    <p>{{ training!.id }}</p>
    <p>{{ training!.length }}</p>
    <p>{{ training!.channel }}</p>
    <p>{{ training!.date_created }}</p>
    <button @click="deleteTraining">Delete training</button>
    <button @click="recordTraining">Record training</button>
  </div>
</template>

<style scoped>
.training-full {
  display: flex;
  flex-flow: column;
  margin-bottom: 1rem;
}
</style>
