<script lang="ts" setup>
import { worksitesData } from '~/data/worksite';
import type { VDataTableHeaders } from 'vuetify/components';
import { type WorksiteStatusEnum, WorksiteStatusEnumMap } from '~/components/Worksites/Types/worksiteStatusEnum';

const headers = computed<VDataTableHeaders>(() => {
  return [
    { title: $t('worksite.list.name'), key: 'worksiteName' },
    { title: $t('worksite.list.client'), key: 'client' },
    { title: $t('worksite.list.place'), key: 'place' },
    { title: $t('worksite.list.startDate'), key: 'startDate', align: 'center' },
    { title: $t('worksite.list.endDate'), key: 'endDate', align: 'center' },
    { title: $t('worksite.list.status'), key: 'status', align: 'center' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false }
  ];
});
const search = ref('');
const statusFilter = ref<WorksiteStatusEnum | ''>();
const StatusSelect = Array.from(WorksiteStatusEnumMap.entries()).map(([key, value]) => ({
  title: value,
  value: key as WorksiteStatusEnum
}));
const filteredWorksites = computed(() => {
  let filtered = worksitesData;
  if (search.value) {
    const query = search.value.toLowerCase();
    filtered = filtered.filter(worksite =>
      worksite.worksiteName.toLowerCase().includes(query)
      || worksite.client.toLowerCase().includes(query)
      || (worksite.place?.toLowerCase().includes(query) ?? false)
    );
  }
  if (statusFilter.value) {
    filtered = filtered.filter(worksite => worksite.status === statusFilter.value);
  }

  return filtered;
});
</script>

<template>
  <v-card>
    <v-data-table-server
      :headers="headers"
      :items="filteredWorksites"
      density="comfortable"
    >
      <template #no-data>
        {{ $t('worksite.list.noData') }}
      </template>
      <template #top>
        <div class="d-flex flex-row justify-between m-4 gap-2">
          <div class="d-flex flex-row w-50 mb-4 gap-5">
            <v-text-field
              v-model="search"
              prepend-inner-con="mdi-magnify"
              :label="$t('worksite.list.search')"
              placeholder="Par nom, lieu"
              single-line
              variant="outlined"
              class="w-80"
              clearable
            />
            <v-select
              v-model="statusFilter"
              :items="StatusSelect"
              :label="$t('worksite.list.statusSearch')"
              variant="outlined"
              clearable
              class="w-auto"
            />
          </div>
          <NuxtLink
            :to="{ name: 'worksites-createdOrUpdateWorksite' }"
          >
            <VBtn color="primary">
              {{ $t('worksite.add') }}
            </VBtn>
          </NuxtLink>
        </div>
      </template>
      <template #item="{ item }">
        <WorksitesListRow :worksite="item" />
      </template>
    </v-data-table-server>
  </v-card>
</template>
