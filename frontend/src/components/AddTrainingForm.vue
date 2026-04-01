<script setup lang="ts">
import { trainingRepository } from '@/repositories/repositoryProvider'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', payload: { video_id: string }): void
}>()

const video_id = ref('')
const error = ref('')

const handleSubmit = async () => {
  if (await validateID()) {
    emit('submit', {
      video_id: video_id.value,
    })
  }
}

const validateID = async () => {
  if (video_id.value == '') {
    error.value = 'Field cannot be empty'
    return false
  }
  const id = extractVideoId(video_id.value)
  if (id == null) {
    error.value = 'Wrong ID/URL format'
    return false
  } else {
    video_id.value = id
  }
  if ((await trainingRepository.getByID(id)) != undefined) {
    error.value = 'Training already exists'
    return false
  }
  error.value = ''
  return true
}

function extractVideoId(input: string): string | null {
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input
  }

  try {
    const url = new URL(input)
    const host = url.hostname.replace('www.', '')

    if (host === 'youtu.be') {
      return url.pathname.split('/')[1] || null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = url.searchParams.get('v')
      if (v) return v

      if (url.pathname.startsWith('/shorts/')) {
        return url.pathname.split('/')[2] || null
      }

      if (url.pathname.startsWith('/embed/')) {
        return url.pathname.split('/')[2] || null
      }
    }

    return null
  } catch {
    return null
  }
}
</script>

<template>
  <div class="new-training-form">
    <form @submit.prevent="handleSubmit">
      <input
        type="text"
        name="video_id"
        id="video_id"
        v-model="video_id"
        @blur="validateID"
        placeholder="Video ID or URL"
      />
      <input type="submit" value="Create" />
    </form>
    <p v-if="error != ''">{{ error }}</p>
  </div>
</template>

<style scoped></style>
