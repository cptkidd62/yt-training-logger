<script setup lang="ts">
import AddTrainingForm from '@/components/AddTrainingForm.vue'
import { trainingRepository } from '@/repositories/repositoryProvider'
import { Training } from '@/types/training'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleCreate = async (payload: { video_id: string }) => {
  const res = await trainingRepository.add(
    new Training(payload.video_id, 'Training ' + payload.video_id, 30, 'Channel', 0),
  )
  if (res != '') {
    router.push('/')
  }
}
</script>

<template>
  <AddTrainingForm @submit="handleCreate" />
</template>

<style scoped></style>
