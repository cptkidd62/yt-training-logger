<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Training } from '@/types/training'
export default defineComponent({
  props: {
    training: {
      type: Object as PropType<Training>,
      required: true,
    },
  },
})
</script>

<template>
  <div class="training-full">
    <h1 class="id">{{ training.title }}</h1>
    <p>{{ training.id }}</p>
    <p>{{ training.length }}</p>
    <p>{{ training.channel }}</p>
    <p>{{ training.date_created }}</p>
  </div>
</template>

<style scoped>
.training-full {
  display: flex;
  flex-flow: column;
  margin-bottom: 1rem;
}

.name {
  margin-right: 1rem;
}
</style>
