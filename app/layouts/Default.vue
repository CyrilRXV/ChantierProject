<script setup lang="ts">
</script>

<template>
  <v-layout>
    <LayoutNavBar />
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <LayoutAppFooter />
  </v-layout>
</template>
