<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Training } from '@/types/training';
export default defineComponent({
  props: {
    training: {
      type: Object as PropType<Training>,
      required: true
    }
  }
})
</script>

<template>
  <div class="training-list-item">
    <h3 class="id">{{ training.id }}</h3>
  </div>
</template>

<style scoped>
.training-list-item {
  display: flex;
  flex-flow: row;
  margin-bottom: 1rem;
}

.name {
  margin-right: 1rem;
}
</style>