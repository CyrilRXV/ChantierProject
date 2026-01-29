<script lang="ts" setup>
import type { ClientInterface } from '~/components/Clients/Types/client.interface';

defineProps<{ filteredClients: ClientInterface[] }>();
</script>

<template>
  <v-row>
    <v-col
      v-for="client in filteredClients"
      :key="client.id"
      class="text-center"
      lg="3"
      md="4"
      sm="6"
      xl="2"
    >
      <v-hover
        v-slot="{ isHovering, props }"
      >
        <NuxtLink
          :to="{
            name: 'clients-clientId',
            params: { clientId: client.id }
          }"
          @click.stop
        >
          <v-card
            :client="client"
            :class="{ 'on-hover': isHovering }"
            :color="isHovering ? 'grey-lighten-3' : 'blue-lighten-4'"
            :elevation="isHovering ? 16 : 2"
            class="my-2 mx-2 rounded-lg"
            height="350"
            max-width="350"
            v-bind="props"
          >
            <v-card-item>
              <v-avatar
                class="mb-4 mx-auto"
                size="120"
              >
                <v-img
                  :src="client.logo"
                  alt="Avatar"
                />
              </v-avatar>
              <v-card-title class="pa-0 ma-0">
                {{ client.societyName }}
              </v-card-title>
              <v-card-text class="mt-4 pa-0 ma-0 border-md rounded-lg">
                <v-list
                  class="pa-0 ma-0 align-center"
                  density="compact"
                >
                  <v-list-item class="pa-0 bg-blue-lighten-3">
                    <span class="text-medium-emphasis">Contact :</span>
                    <v-list-item-title class="font-weight-bold">{{ client.contact }}</v-list-item-title>
                  </v-list-item>
                  <v-divider />
                  <v-list-item class="pa-0 bg-blue-lighten-3">
                    <span class="text-medium-emphasis">Téléphone:</span>
                    <v-list-item-title>{{ client.phone }}</v-list-item-title>
                  </v-list-item>
                  <v-divider />
                  <v-list-item class="pa-0 bg-blue-lighten-3">
                    <span class="text-medium-emphasis">Email :</span>
                    <v-list-item-title class="font-weight-bold">{{ client.email }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card-item>
          </v-card>
        </NuxtLink>
      </v-hover>
    </v-col>
  </v-row>
</template>

