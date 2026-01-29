<script setup lang="ts">
import { clientsData } from "~/data/clients";
import type {ClientInterface} from "~/components/Clients/Types/client.interface";

const route = useRoute('clients-clientId-edit');
const clientId = computed((): number =>
    Number(route.params.clientId)
);
const client = computed((): ClientInterface =>
    <ClientInterface>clientsData.find(
        client => client.id === clientId.value
    ) ?? null
);
</script>

<template>
  <div>
    <h1 class="m-6 text-4xl text-center text-primary font-bold">
      Modifier un client
    </h1>
    <ClientsCreatedOrUpdate :client="client" />
  </div>
</template>
