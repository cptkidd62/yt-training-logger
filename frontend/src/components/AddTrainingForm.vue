<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', payload: { video_id: string }): void
}>()

const video_id = ref('')

const handleSubmit = () => {
  if (validateID()) {
    emit('submit', {
      video_id: video_id.value,
    })
  }
}

const validateID = () => {
  return video_id.value != ''
}
</script>

<template>
  <div class="new-training-form">
    <form @submit.prevent="handleSubmit">
      <input type="text" name="video_id" id="video_id" v-model="video_id" placeholder="Video ID" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<style scoped></style>
