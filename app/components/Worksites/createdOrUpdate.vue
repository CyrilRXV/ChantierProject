<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { clientsData } from '~/data/clients';
import type { WorksiteInterface } from '~/components/Worksites/Types/worksite.interface';
import type { ApiResponse } from '~/interfaces/ApiResponse';

interface FormDto {
  worksiteName: string;
  client: string;
  place: string;
  startDate: Date | null;
  endDate: Date | null;
};

const props = defineProps<{ worksite?: WorksiteInterface }>();
const alert = ref<boolean>(false);
const { errors, handleSubmit, isSubmitting, defineField } = useForm<FormDto>({
  validationSchema: toTypedSchema(
    z.object({
      worksiteName: z
        .string()
        .min(1, { message: 'le champ est obligatoire' })
        .min(3, { message: 'Le nom doit être supérieur a 1 caratère' })
        .max(25, { message: 'Le nom ne peut pas dépasser 25 caractères' }),
      client: z
        .string()
        .min(1, { message: 'le champ est obligatoire' }),
      place: z
        .string()
        .min(1, { message: 'le champ est obligatoire' })
        .max(250, { message: 'Le nom ne peut pas dépasser 250 caractères' }),
      startDate: z
        .date()
        .optional(),
      endDate: z
        .date()
        .optional()
    })
      .refine(data => !data.startDate || !data.endDate || data.endDate > data.startDate, {
        message: 'Date de fin doit être après la date de début',
        path: ['endDate']
      })
  ),
  initialValues: {
    worksiteName: props.worksite?.worksiteName || '',
    client: props.worksite?.client || '',
    place: props.worksite?.place || '',
    startDate: props.worksite?.startDate || undefined,
    endDate: props.worksite?.endDate || undefined
  }
});

const formValues = ref<FormDto | null>(null);
const showConfirmDialog = ref(false);

const submitForm = handleSubmit(async (values: FormDto | null): Promise<void> => {
  if (!props.worksite) {
    await createWorksite(values);
  } else {
    await updateWorksite(props.worksite.id, values);
  }
});

const clientItems = computed((): object =>
  clientsData.map((client: { societyName: string }) => ({
    title: client.societyName
  }))
);

const createWorksite = async (values: FormDto | null) => {
  try {
    formValues.value = values;
    await nextTick();
    showConfirmDialog.value = true;
    await $fetch<ApiResponse<WorksiteInterface>>(
      'api/worksite',
      {
        method: 'post',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    if (error) {
      console.log('erreur creation');
    }
  }
};

const [client, clientAttrs] = defineField('client');
const [worksiteName, worksiteNameAttrs] = defineField('worksiteName', { validateOnModelUpdate: false });
const [place, placeAttrs] = defineField('place', { validateOnModelUpdate: false });
const [startDate, startDateAttrs] = defineField('startDate');
const [endDate, endDateAttrs] = defineField('endDate');

const updateWorksite = async (worksiteId: number, values: FormDto | null): Promise<void> => {
  try {
    formValues.value = values;
    await nextTick();
    showConfirmDialog.value = true;
    const { data } = await $fetch<ApiResponse<WorksiteInterface>>(
      `http://localhost/api/worksite/${worksiteId}`,
      {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    navigateTo(`/worksites/${data.id}`);
  } catch (error) {
    if (error) {
      console.log('erreur mise a jour');
    }
  }
};
</script>

<template>
  <v-form
    class="d-flex justify-center"
    @submit.prevent="submitForm"
  >
    <v-card class="flex-column align-center pa-8 w-50 border-xl">
      <div class="d-flex gap-4 ">
        <v-select
          v-model="client"
          :error-messages="errors.client"
          :items="clientItems"
          class="w-auto"
          clearable
          label="Selectionner le client"
          v-bind="clientAttrs"
          required
        />
        <NuxtLink
          :to="{ name: 'clients-createdOrUpdateClient' }"
        >
          <v-btn color="secondary">
            Créer
          </v-btn>
        </NuxtLink>
      </div>
      <v-text-field
        v-model="worksiteName"
        :error-messages="errors.worksiteName"
        class="w-auto mt-6"
        clearable
        label="Nom du chantier"
        v-bind="worksiteNameAttrs"
      />
      <v-text-field
        v-model="place"
        :error-messages="errors.place"
        class="w-auto mt-4"
        clearable
        label="lieu"
        v-bind="placeAttrs"
      />
      <div class="flex flex-row gap-8 mt-4">
        <v-date-input
          v-model="startDate"
          :error-messages="errors.startDate"
          class="w-auto"
          clearable
          label="Date de début"
          v-bind="startDateAttrs"
          variant="outlined"
        />
        <v-date-input
          v-model="endDate"
          :error-messages="errors.endDate"
          class="w-auto"
          clearable
          label="Date de fin"
          v-bind="endDateAttrs"
          variant="outlined"
        />
      </div>

      <v-btn
        :disable="isSubmitting"
        class="mt-2 w-25"
        color="primary"
        type="submit"
      >
        Ajouter
      </v-btn>
    </v-card>
  </v-form>
  <v-alert
    v-model="alert"
    text="Erreur lors de la création"
    title="Alert erreur"
    type="error"
  />
  <v-dialog
    v-model="showConfirmDialog"
    v-click-outside
    max-width="500"
    persistent
  >
    <v-card class="rounded-lg">
      <v-card-title class="d-flex align-center gap-3 pa-6">
        <v-icon
          color="success"
          size="32"
        >
          mdi-check-circle
        </v-icon>
        <span class="text-h5 font-weight-bold">Confirmation création</span>
      </v-card-title>
      <v-card-text class="pa-6">
        <div
          v-if="formValues"
          class="space-y-2"
        >
          <div class="d-flex">
            <strong class="mr-2">Nom chantier :</strong>
            <span>{{ formValues.worksiteName }}</span>
          </div>
          <div class="d-flex">
            <strong class="mr-2">Client :</strong>
            <span>{{ formValues.client || 'Non spécifié' }}</span>
          </div>
          <div class="d-flex">
            <strong class="mr-2">Lieu :</strong>
            <span>{{ formValues.place || 'Non spécifié' }}</span>
          </div>
          <div
            v-if="formValues.startDate"
            class="d-flex"
          >
            <strong class="mr-2 ">Début :</strong>
            <span>{{ new Date(formValues.startDate).toLocaleDateString('fr-FR') }}</span>
          </div>
          <div
            v-if="formValues.endDate"
            class="d-flex"
          >
            <strong class="mr-2">Fin :</strong>
            <span>{{ new Date(formValues.endDate).toLocaleDateString('fr-FR') }}</span>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <v-btn
          class="bg-success w-100"
          @click="showConfirmDialog = false, navigateTo(`/worksites`);"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
