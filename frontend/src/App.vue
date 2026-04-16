<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="navigation-bar">
    <RouterLink to="/trainings">Trainings</RouterLink>
    <RouterLink to="/logs">Logs</RouterLink>
    <RouterLink to="/plans">Plans</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
  </div>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: var(--color-primary);
  margin: 0;
  height: 3em;
}

.navigation-bar a {
  margin: auto;
  padding: 0.1em;
  border: 2px solid var(--color-secondary);
  font-size: 2em;
}

.navigation-bar a:hover,
.navigation-bar a:active {
  text-decoration: none;
  color: var(--color-text);
  background-color: var(--color-secondary);
}

.content {
  margin: 0 auto;
  padding: 1em 3em;
}
</style>
