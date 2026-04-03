<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="navigation-bar">
    <RouterLink to="/trainings">Trainings</RouterLink>
    <RouterLink to="/logs">Logs</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
  </div>
  <RouterView />
</template>

<style scoped>
.navigation-bar {
  display: flexbox;
  flex-direction: row;
}
</style>
