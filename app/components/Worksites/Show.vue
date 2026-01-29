<script lang="ts" setup>
type itemsMenuType
  = 'Récapitulatif'
    | 'Devis'
    | 'Factures'
    | 'Factures fournisseurs'
    | 'Factures sous-traitant'
    | 'Répartition Main d\'oeuvre'
    | 'Autres';

const tab = ref('null');
const itemsMenu: itemsMenuType[] = [
  'Récapitulatif',
  'Devis',
  'Factures',
  'Factures fournisseurs',
  'Factures sous-traitant',
  'Répartition Main d\'oeuvre',
  'Autres'
];
</script>

<template>
  <v-tabs
    v-model="tab"
  >
    <v-tab
      v-for="item in itemsMenu"
      :key="item"
      :text="item"
      :value="item"
    />
  </v-tabs>
  <v-tabs-window v-model="tab">
    <v-tabs-window-item
      v-for="item in itemsMenu"
      :key="item"
      :value="item"
    >
      <v-card flat>
        <WorksitesLinkCard :type="item" />
      </v-card>
    </v-tabs-window-item>
  </v-tabs-window>
</template>
