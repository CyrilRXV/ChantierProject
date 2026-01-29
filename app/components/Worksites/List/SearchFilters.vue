<script lang="ts" setup>
import type { WorksiteStatusEnum } from '~/components/Worksites/Types/worksiteStatusEnum';
import { WorksiteStatusEnumMap } from '~/components/Worksites/Types/worksiteStatusEnum';

const search = ref();
const statusFilter = ref();
const StatusSelect = Array.from(WorksiteStatusEnumMap.entries()).map(([key, value]) => ({
  title: value,
  value: key as WorksiteStatusEnum
}));
</script>

<template>
  <div class="d-flex flex-row m-4 gap-5">
    <v-text-field
      v-model="search"
      prepend-inner-con="mdi-magnify"
      label="Recherche de chantier"
      placeholder="Par nom, lieu"
      single-line
      variant="outlined"
      class="w-80"
      clearable
      @update:model-value="emit('update:search', $event)"
    />

    <v-select
      v-model="statusFilter"
      :items="StatusSelect"
      label="Etat du chantier"
      variant="outlined"
      class="w-25"
    />
    <v-btn
      variant="text"
      color="secondary"
      prepend-icon="mdi-filter-off"
      @click="clearFilters"
    >
      Réinitialiser
    </v-btn>
  </div>
</template>

<style scoped>

</style>
