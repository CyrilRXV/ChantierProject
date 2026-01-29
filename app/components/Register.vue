<script setup lang="ts">

</script>

<template>
  <v-card
    class="mx-auto px-6 py-8 border"
  >
    <v-form @submit.prevent="">
      <v-text-field
        v-model="credentials.name"
        class="mb-2 w-auto"
        label="Name"
        clearable
      />
      <v-text-field
        v-model=""
        class="mb-2 w-auto"
        label="Email"
        placeholder="johndoe@gmail.com"
        type="email"
        clearable
      />
      <v-text-field
        v-model=""
        class="mb-4 w-auto"
        label="Mot de passe"
        type="password"
        placeholder="Enter votre mot passe"
        clearable
      />
      <v-text-field
        v-model=""
        class="mb-4 w-auto"
        label="Confirme le Mot de passe"
        type="password"
        placeholder="Enter votre mot passe"
        clearable
      />

      <v-btn
        class="w-80"
        color="secondary"
        variant="elevated"
      >
        S'incrire
      </v-btn>
    </v-form>
  </v-card>
</template>
