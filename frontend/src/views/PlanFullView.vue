<script setup lang="ts">
import { toLocaleDateString } from '@/helpers/DateTools'
import { plansRepository, trainingRepository } from '@/repositories/repositoryProvider'
import router from '@/router'
import { Training } from '@/types/training'
import { planViewToRaw, type TrainingPlanView } from '@/types/trainingplan'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const plan = ref<TrainingPlanView | undefined>(undefined)
const trainings = ref<Training[]>([])
const loading = ref(true)
const selectedTrainings = ref(Array.from({ length: 15 }, () => Array.from({ length: 8 }, () => '')))
const days = ref<[string, number][]>([
  ['Monday', 1],
  ['Tuesday', 2],
  ['Wednesday', 3],
  ['Thursday', 4],
  ['Friday', 5],
  ['Saturday', 6],
  ['Sunday', 0],
  ['Other', 7],
])

const route = useRoute()
onMounted(async () => {
  const id = route.params.id as string
  const id_num = Number.parseInt(id)
  plan.value = await plansRepository.getByID(id_num)
  trainings.value = await trainingRepository.getAll()
  if (plan.value === undefined) {
    router.push('/')
  }
  loading.value = false
})

function addWeek() {
  plan.value!.weeks.push(Array.from({ length: 8 }, () => []))
  plansRepository.update(plan.value!.id, planViewToRaw(plan.value!))
}

function deleteWeek(idx: number) {
  if (confirm('Do you really want to delete this week?')) {
    plan.value!.weeks.splice(idx, 1)
    plansRepository.update(plan.value!.id, planViewToRaw(plan.value!))
  }
}

function addTraining(weekId: number, dayId: number) {
  const training = trainings.value.find((tr) => tr.id == selectedTrainings.value[weekId]![dayId]!)
  console.log(training)
  if (training !== undefined) plan.value!.weeks[weekId]![dayId]?.push(training)
  console.log(plan.value?.weeks)
  plansRepository.update(plan.value!.id, planViewToRaw(plan.value!))
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="plan" class="plan-full">
    <h1>{{ plan.title }}</h1>
    <p>{{ toLocaleDateString(plan.createdAt) }}</p>
    <details v-for="(week, idx) in plan.weeks" :key="idx" class="week">
      <summary>Week {{ idx + 1 }}</summary>
      <details v-for="[day, idd] in days" :key="idd" class="day">
        <summary>{{ day }}</summary>
        <ul>
          <li v-for="(training, idt) in week[idd]" :key="idt">
            <RouterLink :to="`/trainings/${training.id}`">{{ training.title }}</RouterLink>
          </li>
        </ul>
        <select v-model="selectedTrainings[idx]![idd]">
          <option v-for="training in trainings" :key="training.id" :value="training.id">
            {{ training.title }}
          </option>
        </select>
        <button @click="addTraining(idx, idd)">Add to plan</button>
      </details>
      <button @click="deleteWeek(idx)">Delete week</button>
    </details>
    <button @click="addWeek">Add week</button>
  </div>
</template>

<style scoped>
.plan-full {
  display: flex;
  flex-flow: column;
  margin-bottom: 1rem;
}

.week {
  margin-top: 2em;
}

.week summary {
  font-weight: bold;
  font-size: larger;
}

.day {
  margin-left: 2em;
  margin-top: 1em;
}

button {
  margin: 3em;
}
</style>
