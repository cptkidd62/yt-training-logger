<script setup lang="ts">
import { Training } from './types/training';
import TrainingFullView from './views/TrainingFullView.vue';
import TrainingsListView from './views/TrainingsListView.vue';
</script>

<template>
  <h1>The app</h1>
  <TrainingsListView />
  <TrainingFullView :training="new Training('abs')" />
</template>

<style scoped></style>
