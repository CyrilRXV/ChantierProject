<script setup lang="ts">
import logo from '~/assets/images/imageChantier.png';
</script>

<template>
  <v-layout>
    <v-main class="d-flex flex-column align-center justify-center fill-height">
      <v-container>
        <v-img
          :src="logo"
          max-width="980"
          max-height="300"
          class="mx-auto"
          cover
        />
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>
