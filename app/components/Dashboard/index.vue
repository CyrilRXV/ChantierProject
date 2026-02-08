<script setup lang="ts">
import type { ApiResponse } from '~/interfaces/ApiResponse';
import type { WorksiteInterface } from '~/components/Worksites/Types/worksite.interface';

definePageMeta({
  // middleware: ['sanctum:auth']
  // pour la Démo
  middleware: ['sanctum:guest']
});

const client = useSanctumClient();

const { data: worksite } = await useAsyncData<ApiResponse<WorksiteInterface>>(
  'worksite',
  () => client('http://localhost/api/user/worksite')
);
</script>

<template>
  <div v-if="worksite?.data">
    Contenu
  </div>
</template>

<style scoped>

</style>
