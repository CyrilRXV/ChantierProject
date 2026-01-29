<script lang="ts" setup>
const searchName = ref('');
</script>

<template>
  <div class="d-flex flex-row gap-5">
    <v-text-field
      v-model="searchName"
      clearable
      label="Recherche de client"
      max-width="30%"
      placeholder="Par nom"
      prepend-inner-con="mdi-magnify"
      single-line
      variant="outlined"
    />
  </div>
</template>

<style scoped>

</style>
