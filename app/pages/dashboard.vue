<script setup lang="ts">
definePageMeta({
  // middleware: ['sanctum:auth']
  // pour la Démo
  middleware: ['sanctum:guest']
});
</script>

<template>
  <div>
    <h1>Page Dashboard</h1>
    <Dashboard />
  </div>
</template>

<style scoped>

</style>
