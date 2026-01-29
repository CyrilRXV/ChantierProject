<script lang="ts" setup>
const route = useRoute('clients-clientId');
const clientId = route.params.clientId;
</script>

<template>
  <div>
    <strong>Show Client n° :</strong>
    {{ clientId }}
  </div>
</template>

<style scoped>

</style>
