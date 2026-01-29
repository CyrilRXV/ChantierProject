<script lang="ts" setup>
const items = ['Chantier 1', 'Chantier 2', 'Chantier 3', 'Chantier 4']
</script>

<template>
  <h1 class="bg-primary text-center pb-2">
    Suivi du chantier
  </h1>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="auto">
        <v-select
          :items="items"
          :menu-props="{ scrim: true, scrollStrategy: 'close' }"
          class="w-full min-w-96"
          label="Sélectionner le chantier"
        />
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <div>
        <strong>Télécharger :</strong>
      </div>
      <v-col cols="auto">
        <v-btn>
          Devis
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn>
          Facture
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          outlined
        >
          Autres
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
