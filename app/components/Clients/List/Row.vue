<script lang="ts" setup>
import type { ClientInterface } from '~/components/Clients/Types/client.interface';

defineProps<{ client: ClientInterface }>();

const router = useRouter();
const showDeleteDialog = ref(false);
const clientIdDelete = ref<number | null>(null);
const isDeleting = ref(false);
const showClient = (clientId: number) => {
  router.push({ name: 'clients-clientId', params: { clientId } });
};
function Delete(worksiteId: number) {
  clientIdDelete.value = worksiteId;
  showDeleteDialog.value = true;
}

async function deleteWorksite() {
  if (!clientIdDelete.value) {
    return;
  }
  isDeleting.value = true;
  try {
    await $fetch(`/api/client/${clientIdDelete.value}`, {
      method: 'DELETE'
    });
  } catch (error) {
    if (error) {
      console.log('erreur lors de la suppression');
    }
  } finally {
    isDeleting.value = false;
    showDeleteDialog.value = false;
  }
}
</script>

<template>
  <tr
    class="hoverableTr"
    @click="showClient(client.id)"
  >
    <td>
      {{ client.societyName }}
    </td>
    <td>
      {{ client.email }}
    </td>
    <td>
      {{ client.contact ? client.contact : '-' }}
    </td>
    <td class="size-36 text-center">
      {{ client.address ? client.address : '-' }}
    </td>
    <td class="size-36 text-center">
      {{ client.postalCode ? client.postalCode : '-' }}
    </td>
    <td class="size-36 text-center">
      {{ client.phone ? client.phone : '-' }}
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
                  name: 'clients-clientId-edit',
                  params: { clientId: client.id }
                })"
            />
          </template>
          {{ $t('btn.update') }}
        </v-tooltip>
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-icon
              class="hoverIcon"
              color="error"
              icon="mdi mdi-trash-can-outline"
              size="x-large"
              v-bind="props"
              @click.stop="Delete(client.id)"
            />
          </template>
          {{ $t('btn.delete') }}
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
        {{ $t('modal.titleDelete') }}
      </v-card-title>

      <v-card-text>
        <p class="mb-0">
          {{ $t('modal.confirmationMessageClient') }}<br>
          <strong>{{ client.societyName }}</strong>
        </p>
        <p class="text-caption mt-2 text-medium-emphasis">
          {{ $t('modal.irreversibleMessage') }}
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
          {{ $t('btn.cancel') }}
        </v-btn>
        <v-btn
          border
          color="error"
          :loading="isDeleting"
          @click="deleteWorksite"
        >
          {{ $t('btn.delete') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
