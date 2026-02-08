<script lang="ts" setup>
import type { VDataTableHeaders } from 'vuetify/components';
import { type WorksiteStatusEnum, WorksiteStatusEnumMap } from '~/components/Worksites/Types/worksiteStatusEnum';
import type { WorksiteInterface } from '~/components/Worksites/Types/worksite.interface';

const { data: worksitesData } = await useFetch<WorksiteInterface[]>('/api/worksites');
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
  let filtered = worksitesData.value;
  if (search.value) {
    const query = search.value.toLowerCase();
    filtered = filtered?.filter(worksite =>
      worksite.worksiteName.toLowerCase().includes(query)
      || worksite.client.toLowerCase().includes(query)
      || (worksite.place?.toLowerCase().includes(query) ?? false)
    );
  }
  if (statusFilter.value) {
    filtered = filtered?.filter(worksite => worksite.status === statusFilter.value);
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
        <div class="d-flex justify-space-between">
          <div class="d-flex flex-row w-50 ga-4">
            <v-col cols="8">
              <v-text-field
                v-model="search"
                prepend-inner-con="mdi-magnify"
                :label="$t('worksite.list.search')"
                :placeholder="$t('worksite.list.searchPlaceholder')"
                single-line
                variant="outlined"
                clearable
              />
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="statusFilter"
                :items="StatusSelect"
                :label="$t('worksite.list.statusSearch')"
                variant="outlined"
                clearable
              />
            </v-col>
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
