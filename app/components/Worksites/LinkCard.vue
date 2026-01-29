<script lang="ts" setup>
import RecapCard from '~/components/Worksites/Card/RecapCard.vue';
import InvoiceCard from '~/components/Worksites/Card/InvoiceCard.vue';
import QuoteCard from '~/components/Worksites/Card/QuoteCard.vue';
import InvoiceSupplierCard from '~/components/Worksites/Card/InvoiceSupplierCard.vue';
import InvoiceSubcontractorCard from '~/components/Worksites/Card/InvoiceSubcontractorCard.vue';
import WorkforceAllocationCard from '~/components/Worksites/Card/WorkforceAllocationCard.vue';
import OthersCard from '~/components/Worksites/Card/OthersCard.vue';

const props = defineProps<{
  type: 'Récapitulatif' | 'Devis' | 'Factures' | 'Factures fournisseurs' | 'Factures sous-traitant'
    | 'Répartition Main d\'oeuvre' | 'Autres';
}>();

const cardComponent = computed(() => {
  switch (props.type) {
    case 'Récapitulatif':
      return RecapCard;
    case 'Devis':
      return QuoteCard;
    case 'Factures':
      return InvoiceCard;
    case 'Factures fournisseurs':
      return InvoiceSupplierCard;
    case 'Factures sous-traitant':
      return InvoiceSubcontractorCard;
    case 'Répartition Main d\'oeuvre':
      return WorkforceAllocationCard;
    case 'Autres':
      return OthersCard;
    default:
      return RecapCard;
  }
});
</script>

<template>
  <component :is="cardComponent" />
</template>

<style scoped>

</style>
