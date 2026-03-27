<script setup lang="ts">
import TrainingsListItem from '@/components/TrainingsListItem.vue';
import { Training } from '@/types/training';

const trainings = [
    new Training('aaa'),
    new Training('bbb'),
    new Training('ccc'),
]
</script>

<template>
  <h1>Trainings list</h1>
  <TrainingsListItem v-for="training in trainings" :training="training" :key="training.id"/>
</template>

<style scoped></style>