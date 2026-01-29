<script setup lang="ts">
const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]
</script>

<template>
  <v-footer
    class="text-center d-flex flex-column ga-2 py-4"
    app
  >
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      />
    </div>

    <v-divider class="my-2" thickness="2" width="50"></v-divider>
    <div class="d-flex ga-3">
      <p class="text-sm">
        Copyright © {{ new Date().getFullYear() }}
        <strong>Chantier Pilot </strong>
      </p>
    </div>
  </v-footer>
</template>

