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
    formValues.value = values;
    await nextTick();
    showConfirmDialog.value = true;
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
    <v-card class="pa-8 w-50 border-xl">
      <div class="d-flex flex-row ga-4">
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
      <div class="d-flex flex-row w-66 ga-6">
        <v-date-input
          v-model="startDate"
          x
          :error-messages="errors.startDate"
          clearable
          label="Date de début"
          v-bind="startDateAttrs"
          variant="outlined"
          class="w-50"
        />
        <v-date-input
          v-model="endDate"
          :error-messages="errors.endDate"
          clearable
          label="Date de fin"
          v-bind="endDateAttrs"
          variant="outlined"
          class="w-50"
        />
      </div>

      <v-btn
        :disable="isSubmitting"
        color="primary"
        type="submit"
      >
        <template v-if="!worksite">
          Ajouter
        </template>
        <template v-else>
          Modifier
        </template>
      </v-btn>
    </v-card>
  </v-form>
  <v-alert
    v-model="alert"
    text="Erreur lors de la création"
    title="Alert erreur"
    type="error"
  />
  <BaseDialog :show-confirm-dialog="showConfirmDialog">
    <template #title>
      Résumé des infos du Chantier
    </template>
    <template #nameTitleField>
      Nom chantier :
    </template>
    <template #nameField>
      {{ formValues?.worksiteName }}
    </template>
    <template #clientTitleField>
      Client :
    </template>
    <template #clientField>
      {{ formValues?.client }}
    </template>
    <template #adressTitleField>
      Lieu :
    </template>
    <template #adressField>
      {{ formValues?.place }}
    </template>
    <template #dateStartTitleField>
      Début :
    </template>
    <template v-if="formValues?.startDate" #dateStartField>
      {{ new Date(formValues?.startDate).toLocaleDateString('fr-FR') }}
    </template>
    <template #dateEndTitleField>
      Fin :
    </template>
    <template v-if="formValues?.endDate" #dateEndField>
      {{ new Date(formValues?.endDate).toLocaleDateString('fr-FR') }}
    </template>
    <template #actions>
      <v-spacer />
      <v-btn
        class="bg-success"
        @click="showConfirmDialog = false; navigateTo('/worksites')"
      >
        ok
      </v-btn>
    </template>
  </BaseDialog>
</template>
