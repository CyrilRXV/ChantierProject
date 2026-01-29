<script lang="ts" setup>
</script>

<template>
  <v-layout>
    <v-main>
      <LayoutHeaderTracking />
      <v-container>
        <slot />
      </v-container>
      <LayoutAppFooter />
    </v-main>
  </v-layout>
</template>
