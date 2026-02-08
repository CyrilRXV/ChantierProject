<script lang="ts" setup>
import type { WorksiteInterface } from '~/components/Worksites/Types/worksite.interface';
import { WorksiteStatusEnum, WorksiteStatusEnumMap } from '~/components/Worksites/Types/worksiteStatusEnum';

defineProps<{ worksite: WorksiteInterface }>();

const router = useRouter();
const showDeleteDialog = ref(false);
const worksiteIdDelete = ref<number | null>(null);
const isDeleting = ref(false);
const showWorksite = (worksiteId: number) => {
  router.push({
    name: 'worksites-worksiteId',
    params: { worksiteId }
  });
};

function Delete(worksiteId: number) {
  worksiteIdDelete.value = worksiteId;
  showDeleteDialog.value = true;
}

async function deleteWorksite() {
  if (!worksiteIdDelete.value) {
    return;
  }
  isDeleting.value = true;
  try {
    await $fetch(`/api/worksites/${worksiteIdDelete.value}`, {
      method: 'DELETE'
    });
    // await navigateTo('/worksites', { replace: true });
  } catch (error) {
    if (error) {
      console.log('erreur lors de la suppression');
    }
  } finally {
    isDeleting.value = false;
    showDeleteDialog.value = false;
  }
}
const colorStatusVariant = (status: WorksiteStatusEnum): string => {
  switch (status) {
    case WorksiteStatusEnum.ToDo:
      return 'success';
    case WorksiteStatusEnum.InProgress:
      return 'info';
    case WorksiteStatusEnum.Finished:
      return 'warning';
    default:
      return 'primary';
  }
};

const formatDate = (date: Date | string | undefined): string => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR');
};
</script>

<template>
  <tr
    class="hoverableTr"
    @click="showWorksite(worksite.id)"
  >
    <td>
      {{ worksite.worksiteName }}
    </td>
    <td>
      {{ worksite.client }}
    </td>
    <td>
      {{ worksite.place ? worksite.place : '-' }}
    </td>
    <td class="size-36 text-center">
      {{ formatDate(worksite.startDate) }}
    </td>
    <td class="size-36 text-center">
      {{ formatDate(worksite.endDate) }}
    </td>
    <td class="size-26">
      <div class="text-center">
        <VChip
          :color="colorStatusVariant(worksite.status)"
          :text="colorStatusVariant(worksite.status)"
          class="text-capitalize"
          size="small"
        >
          {{ WorksiteStatusEnumMap.get(worksite.status) }}
        </VChip>
      </div>
    </td>
    <td class="size-36">
      <div class="d-flex ga-4 justify-end">
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-icon
              class="hoverIcon"
              color="success"
              icon="mdi-pen"
              size="x-large"
              v-bind="props"
              @click.stop="
                navigateTo({
                  name: 'worksites-worksiteId-edit',
                  params: { worksiteId: worksite.id }
                })"
            />
          </template>
          Modifier
        </v-tooltip>
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-icon
              class="hoverIcon"
              color="error"
              icon="mdi mdi-trash-can-outline"
              size="x-large"
              v-bind="props"
              @click.stop="Delete(worksite.id)"
            />
          </template>
          Supprimer
        </v-tooltip>
      </div>
    </td>
  </tr>
  <v-dialog
    v-model="showDeleteDialog"
    max-width="450"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5 d-flex align-center gap-2">
        <v-icon
          color="error"
          size="32"
        >
          mdi-alert-circle
        </v-icon>
        Confirmer suppression
      </v-card-title>

      <v-card-text>
        <p class="mb-0">
          Voulez-vous vraiment supprimer le chantier ?<br>
          <strong>{{ worksite.worksiteName }}</strong>
        </p>
        <p class="text-caption mt-2 text-medium-emphasis">
          Cette action est irréversible.
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          border
          color="primary"
          :disabled="isDeleting"
          @click="showDeleteDialog = false"
        >
          Annuler
        </v-btn>
        <v-btn
          border
          color="error"
          :loading="isDeleting"
          @click="deleteWorksite"
        >
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
