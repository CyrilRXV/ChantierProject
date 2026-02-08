<script lang="ts" setup>
import RecapCard from '~/components/Worksites/Card/RecapCard.vue';
import InvoiceCard from '~/components/Worksites/Card/InvoiceCard.vue';
import QuoteCard from '~/components/Worksites/Card/QuoteCard.vue';
import InvoiceSupplierCard from '~/components/Worksites/Card/InvoiceSupplierCard.vue';
import InvoiceSubcontractorCard from '~/components/Worksites/Card/InvoiceSubcontractorCard.vue';
import WorkforceAllocationCard from '~/components/Worksites/Card/WorkforceAllocationCard.vue';
import OthersCard from '~/components/Worksites/Card/OthersCard.vue';
import { ItemsMenu } from '~/components/Worksites/Types/worksiteItemsTabEnum';

const props = defineProps<{
  type: ItemsMenu;
}>();

const cardComponent = computed(() => {
  switch (props.type) {
    case ItemsMenu.Recapitulatif:
      return RecapCard;
    case ItemsMenu.Devis:
      return QuoteCard;
    case ItemsMenu.Factures:
      return InvoiceCard;
    case ItemsMenu.FacturesFournisseurs:
      return InvoiceSupplierCard;
    case ItemsMenu.FacturesSousTraitant:
      return InvoiceSubcontractorCard;
    case ItemsMenu.RepartitionMainOeuvre:
      return WorkforceAllocationCard;
    case ItemsMenu.Autres:
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
