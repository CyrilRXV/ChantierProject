<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import type { ClientInterface } from '~/components/Clients/Types/client.interface';
import type { ApiResponse } from '~/interfaces/ApiResponse';

const props = defineProps<{ client?: ClientInterface }>();
const alert = ref<boolean>(false);
interface FormDto {
  societyName: string;
  email: string;
  contact: string | undefined;
  address: string | undefined;
  postalCode: string | undefined;
  phone: string | undefined;
  logo: string | undefined;
};

const { errors, handleSubmit, isSubmitting, defineField } = useForm<FormDto>({
  validationSchema: toTypedSchema(
    z.object({
      societyName: z
        .string()
        .min(1, { message: 'le champ est obligatoire' })
        .min(3, { message: 'Le nom doit être supérieur a 1 caratère' })
        .max(25, { message: 'Le nom ne peut pas dépasser 25 caractères' }),
      email: z
        .string()
        .min(1, { message: 'L\'email est requis' })
        .email({ message: 'L\'email doit être valide' }),
      contact: z
        .string()
        .optional(),
      address: z
        .string()
        .optional(),
      postalCode: z
        .string()
        .min(5, { message: 'Le code postal comporte 5 chiffres' })
        .max(5, { message: 'Le code postal comporte 5 chiffres' })
        .optional(),
      phone: z
        .string()
        .min(10, 'Numéro de Téléphone trop court')
        .optional(),
      logo: z
        .string()
        .optional()
    })
  ),
  initialValues: {
    societyName: props.client?.societyName || '',
    email: props.client?.email || '',
    contact: props.client?.contact || undefined,
    address: props.client?.address || undefined,
    postalCode: props.client?.postalCode || undefined,
    phone: props.client?.phone || undefined,
    logo: props.client?.logo || undefined
  }
});

const formValues = ref<FormDto | null>(null);
const showConfirmDialog = ref(false);

const submitForm = handleSubmit(async (values: FormDto | null): Promise<void> => {
  if (!props.client) {
    await createClient(values);
  } else {
    await updateClient(props.client.id, values);
  }
});
const createClient = async (values: FormDto | null) => {
  try {
    formValues.value = values;
    await nextTick();
    showConfirmDialog.value = true;
    await $fetch<ApiResponse<ClientInterface>>(
      'api/client',
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

const [societyName, societyNameAttrs] = defineField('societyName', { validateOnModelUpdate: false });
const [logo, logoAttrs] = defineField('logo');
const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false });
const [contact, contactAttrs] = defineField('contact', { validateOnModelUpdate: false });
const [phone, phoneAttrs] = defineField('phone', { validateOnModelUpdate: false });
const [address, addressAttrs] = defineField('address', { validateOnModelUpdate: false });
const [postalCode, postalCodeAttrs] = defineField('postalCode', { validateOnModelUpdate: false });

const updateClient = async (clientId: number, values: FormDto | null): Promise<void> => {
  try {
    formValues.value = values;
    await nextTick();
    showConfirmDialog.value = true;
    const { data } = await $fetch<ApiResponse<ClientInterface>>(
      `http://localhost/api/client/${clientId}`,
      {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    navigateTo(`/clients/${data.id}`);
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
      <div class="d-flex flex-row gap-8">
        <v-text-field
          v-model="societyName"
          :error-messages="errors.societyName"
          class="w-75 mt-6"
          placeholder="Société A"
          clearable
          label="Nom du client / société *"
          v-bind="societyNameAttrs"
        />
        <v-file-input
          v-model="logo"
          :error-messages="errors.logo"
          label="Logo"
          class="w-25 mt-6"
          prepend-icon="mdi-camera"
          variant="filled"
          v-bind="logoAttrs"
        />
      </div>
      <v-text-field
        v-model="email"
        :error-messages="errors.email"
        class="w-auto mt-6"
        clearable
        type="email"
        placeholder="email@email.fr"
        label="E-mail *"
        v-bind="emailAttrs"
      />
      <div class="d-flex flex-row gap-8">
        <v-text-field
          v-model="contact"
          :error-messages="errors.contact"
          class="w-50 mt-6"
          clearable
          label="Nom du contact"
          v-bind="contactAttrs"
        />
        <v-text-field
          v-model="phone"
          :error-messages="errors.phone"
          class="w-25 mt-6"
          label="N° téléphone"
          placeholder="0601020304"
          v-bind="phoneAttrs"
        />
      </div>
      <div class="d-flex flex-row gap-8">
        <v-text-field
          v-model="address"
          :error-messages="errors.address"
          class="w-75 mt-4"
          prepend-icon="mdi-map-marker"
          clearable
          label="Adresse"
          v-bind="addressAttrs"
        />
        <v-text-field
          v-model="postalCode"
          type="number"
          :error-messages="errors.postalCode"
          class="w-25 mt-4"
          label="Code Postal"
          v-bind="postalCodeAttrs"
        />
      </div>
      <v-btn
        :disable="isSubmitting"
        class="mt-2 w-25"
        color="primary"
        type="submit"
      >
        <template v-if="!client">
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
            <strong class="mr-2">Nom du client :</strong>
            <span>{{ formValues.societyName }}</span>
          </div>
          <div class="d-flex">
            <strong class="mr-2">Email :</strong>
            <span>{{ formValues.email }}</span>
          </div>
          <div class="d-flex">
            <strong class="mr-2">Contact :</strong>
            <span>{{ formValues.contact || 'Non spécifié' }}</span>
          </div>
          <div class="d-flex">
            <strong class="mr-2">Téléphone :</strong>
            <span>{{ formValues.phone || 'Non spécifié' }}</span>
          </div>
          <div class="d-flex">
            <strong class="mr-2">Adresse :</strong>
            <span>{{ formValues.address || 'Non spécifié' }}</span>
          </div>
          <div class="d-flex">
            <strong class="mr-2">Code Postal :</strong>
            <span>{{ formValues.postalCode || 'Non spécifié' }}</span>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <v-btn
          class="bg-success w-100"
          @click="showConfirmDialog = false, navigateTo(`/clients`);"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
