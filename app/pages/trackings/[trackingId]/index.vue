<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

definePageMeta({
  layout: 'tracking'
});
const value = ref(0);

let interval = -1;
onMounted(() => {
  interval = setInterval(() => {
    if (value.value === 100) {
      return (value.value = 0);
    }
    value.value += 10;
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="text-center">
    <v-progress-circular
      :model-value="value"
      :rotate="360"
      :size="100"
      :width="15"
      color="primary"
    >
      <template #default>
        {{ value }} %
      </template>
    </v-progress-circular>

    <v-timeline
      align="start"
      side="end"
    >
      <v-timeline-item
        dot-color="success"
        size="small"
      >
        <template #opposite>
          Opposite
        </template>
        <div class="d-flex">
          <strong class="me-4">12/25</strong>
          <div>
            <strong>Début du chantier</strong>
            <div class="text-caption">
              Démolition / Extraction déchets
            </div>
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item
        dot-color="success"
        size="small"
      >
        <div class="d-flex">
          <strong class="me-4">12/25</strong>
          <div>
            <strong>Placo</strong>
            <div class="text-caption mb-2">
              placo: mur, plafond / bande a joint
            </div>
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item
        dot-color="warning"
        size="small"
      >
        <div class="d-flex">
          <strong class="me-4">01/26</strong>
          <div>
            <strong>Peinture</strong>
            <div class="text-caption">
              Plafond / mur, précouche
            </div>
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item
        dot-color="red"
        size="small"
      >
        <div class="d-flex">
          <strong class="me-4">9-11am</strong>
          <div>
            <strong />
            <div class="text-caption">
              Web App
            </div>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<style scoped>
h1 {
  color: 'primary';
}
.v-progress-circular {
  margin: 1rem;
}
</style>
