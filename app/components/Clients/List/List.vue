<script lang="ts" setup>
import type { VDataTableHeaders } from 'vuetify/components';
import type { ClientInterface } from '~/components/Clients/Types/client.interface';

defineProps<{ filteredClients: ClientInterface[] }>();
const headers = computed<VDataTableHeaders>(() => {
  return [
    { title: $t('client.list.name'), key: 'societyName' },
    { title: $t('client.list.email'), key: 'email' },
    { title: $t('client.list.contact'), key: 'contact' },
    { title: $t('client.list.address'), key: 'address', align: 'center' },
    { title: $t('client.list.postalCode'), key: 'codePostal', align: 'center' },
    { title: $t('client.list.phone'), key: 'phone', align: 'center' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false }
  ];
});
</script>

<template>
  <div>
    <v-data-table-server
      :headers="headers"
      :items="filteredClients"
      density="comfortable"
    >
      <template #no-data>
        {{ $t('client.list.noData') }}
      </template>
      <template #item="{ item }">
        <ClientsListRow :client="item" />
      </template>
    </v-data-table-server>
  </div>
</template>
