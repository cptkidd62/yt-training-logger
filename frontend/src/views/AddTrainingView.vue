<script setup lang="ts">
import AddTrainingForm from '@/components/AddTrainingForm.vue'
import { trainingRepository } from '@/repositories/repositoryProvider'
import { Training } from '@/types/training'
import { useRouter } from 'vue-router'

const router = useRouter()

const getVideoDataFromApi = async (video_id: string): Promise<Training | null> => {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${video_id}&key=${import.meta.env.VITE_YT_API_KEY}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status}`)
  }
  const data = await response.json()
  if (!data.items || data.items.length === 0) {
    return null
  }
  const item = data.items[0]
  return new Training(
    video_id,
    item.snippet.title,
    parseDuration(item.contentDetails.duration),
    item.snippet.channelTitle,
    new Date(item.snippet.publishedAt).getTime(),
  )
}

function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)

  const hours = parseInt(match?.[1] || '0')
  const minutes = parseInt(match?.[2] || '0')

  return hours * 60 + minutes
}

const handleCreate = async (payload: { video_id: string }) => {
  const training = await getVideoDataFromApi(payload.video_id)
  if (training === null) {
    return
  }
  const res = await trainingRepository.add(training)
  if (res != '') {
    router.push('/')
  }
}
</script>

<template>
  <AddTrainingForm @submit="handleCreate" />
</template>

<style scoped></style>
