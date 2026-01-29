<script setup lang="ts">
import type {WorksiteInterface} from "~/components/Worksites/Types/worksite.interface";
import {worksitesData} from "~/data/worksite";

const route = useRoute('worksites-worksiteId-edit');
const worksiteId = computed((): number =>
    Number(route.params.worksiteId)
);
const worksite = computed((): WorksiteInterface =>
    <WorksiteInterface>worksitesData.find(
        worksite => worksite.id === worksiteId.value
    ) ?? null
);
</script>

<template>
  <div>
    <h1 class="m-6 text-4xl text-center text-primary font-bold">
      Modifier un Chantier
    </h1>
    <WorksitesCreatedOrUpdate :worksite="worksite" />
  </div>
</template>
