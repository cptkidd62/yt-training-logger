<script setup lang="ts">
import TrainingsListItem from '@/components/TrainingsListItem.vue'
import { trainingRepository } from '@/repositories/repositoryProvider'
import type { Training } from '@/types/training'
import { onMounted, ref } from 'vue'

const trainings = ref<Training[]>([])
onMounted(async () => {
  trainings.value = await trainingRepository.getAll()
})
</script>

<template>
  <h1>Trainings list</h1>
  <TrainingsListItem v-for="training in trainings" :training="training" :key="training.id" />
  <RouterLink to="/add-training">Add new training</RouterLink>
</template>

<style scoped></style>
