<script setup lang="ts">
import { clientsData } from '~/data/clients';

const activeView = ref(0);
const search = ref('');

const filteredClients = computed(() => {
  let filtered = clientsData;
  if (search.value) {
    const query = search.value.toLowerCase();
    filtered = filtered.filter(client =>
      client.societyName.toLowerCase().includes(query)
      || client.phone?.toLowerCase().includes(query)
      || client.contact?.toLowerCase().includes(query)
      || (client.email.toLowerCase().includes(query) ?? false)
    );
  }

  return filtered;
});
</script>

<template>
  <v-btn-toggle
    v-model="activeView"
    class="d-flex justify-end mb-4"
    color="primary"
    mandatory
  >
    <v-btn
      :icon="activeView === 0 ? 'mdi mdi-format-list-text' : 'mdi mdi-format-list-text'"
      title="Vue liste"
    />
    <v-btn
      :icon="activeView === 1 ? 'mdi-view-module' : 'mdi-view-module-outline'"
      title="Vue cartes"
    />
  </v-btn-toggle>
  <div class="d-flex flex-row justify-between mb-4 gap-6">
    <v-text-field
      v-model="search"
      prepend-inner-con="mdi-magnify"
      :label="$t('client.list.search')"
      :placeholder="$t('client.list.searchPlaceholder')"
      single-line
      variant="outlined"
      clearable
    />
    <NuxtLink
      :to="{ name: 'clients-createdOrUpdateClient' }"
    >
      <VBtn
        class="w-auto"
        color="primary"
      >
        {{ $t('client.add') }}
      </VBtn>
    </NuxtLink>
  </div>
  <ClientsList
    v-if="activeView === 0"
    :filtered-clients="filteredClients"
  />
  <ClientsListCard
    v-else
    :filtered-clients="filteredClients"
  />
</template>

