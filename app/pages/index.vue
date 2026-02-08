<script lang="ts" setup>
definePageMeta({
  layout: 'login',
  middleware: ['sanctum:guest']
});
</script>

<template>
  <v-container class="text-center">
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <h1 class="text-h2 font-weight-bold mb-4 mt-16 text-primary">
          {{ $t('home.title') }}
        </h1>

        <!-- Sous-titre -->
        <p class="text-h5 text-medium-emphasis mb-8">
          {{ $t('home.subTitle') }}
        </p>

        <NuxtLink :to="{ name: 'auth-login' }">
          <v-btn
            size="large"
            color="primary"
          >
            {{ $t('home.btn') }}
          </v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>
