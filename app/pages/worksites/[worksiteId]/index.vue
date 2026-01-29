<script lang="ts" setup>
import type { WorksiteInterface } from '~/components/Worksites/Types/worksite.interface';
import { worksitesData } from '~/data/worksite';

const route = useRoute('worksites-worksiteId');

const worksiteId = computed((): number =>
  Number(route.params.worksiteId)
);
const worksite = computed((): WorksiteInterface =>
  <WorksiteInterface>worksitesData.find(
    w => w.id === worksiteId.value
  ) ?? null
);
const loading = computed((): boolean =>
  worksite.value === null
);
</script>

<template>

  <div
    v-if="loading"
    class="text-center pa-8"
  >
    Chantier non trouvé
  </div>
  <div v-else>
    <div class="flex justify-between">
      <h1 class="mb-4 text-tw-primary">
       {{ worksite.worksiteName }}
      </h1>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <NuxtLink
            :to="{
              name: 'trackings-trackingId',
              params: { trackingId: worksite.id }
            }"
          >
            <v-btn
              icon="mdi mdi-link-variant"
              v-bind="props"
            />
          </NuxtLink>
        </template>
        Lien vers page client
      </v-tooltip>
    </div>
    <WorksitesShow :worksite-id="worksiteId" />
  </div>
</template>
