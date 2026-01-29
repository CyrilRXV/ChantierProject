<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

definePageMeta({
  layout: 'login',
  middleware: ['sanctum:guest']
});

interface FormDto {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const client = useSanctumClient();
const { refreshIdentity } = useSanctumAuth();

const { errors, handleSubmit, defineField } = useForm<FormDto>({
  validationSchema: toTypedSchema(
    z.object({
      name: z
        .string()
        .min(1, { message: 'le champ est obligatoire' })
        .min(3, { message: 'Votre Pseudo doit être supérieur a 3 caratères' })
        .max(25, { message: 'Votre Pseudo ne peut pas dépasser 25 caractères' }),
      email: z
        .string()
        .min(1, { message: 'L\'email est requis' })
        .email({ message: 'L\'email doit être valide' }),
      password: z
        .string()
        .min(1, { message: 'Le mot de passe est requis' })
        .min(3, 'Le mot de passe est trop court'),
      password_confirmation: z
        .string()
    })
  ),
  initialValues: { name: '', email: '', password: '', password_confirmation: '' }
});
const onSubmit = handleSubmit(async (values): Promise<void> => {
  await client<FormDto>('/register', {
    method: 'post',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  await refreshIdentity();
  navigateTo('/teams/create');
});

const [name, nameAttrs] = defineField('name', { validateOnModelUpdate: false });
const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false });
const [password, passwordAttrs] = defineField('password', {});
const [password_confirmation, password_confirmationAttrs] = defineField(
  'password_confirmation', {});
</script>

<template>
  <VCard
    prepend-icon="mdi-account"
    title="Créer un compte"
    class="text-center mt-16 max-w-xl m-auto border"
    rounded="xl"
  >
    <VForm @submit.prevent="onSubmit">
      <VCardText>
        <VTextField
          v-model="name"
          v-bind="nameAttrs"
          class="w-2/3 m-auto mt-4"
          label="Pseudo"
          clearable
          :error-messages="errors.name"
        />
        <VTextField
          v-model="email"
          v-bind="emailAttrs"
          class="w-2/3 m-auto"
          label="Email"
          clearable
          :error-messages="errors.email"
        />
        <VTextField
          v-model="password"
          v-bind="passwordAttrs"
          class="w-2/3 m-auto"
          label="Password*"
          type="password"
          clearable
          :error-messages="errors.password"
        />
        <VTextField
          v-model="password_confirmation"
          v-bind="password_confirmationAttrs"
          class="w-2/3 m-auto"
          label="Confirm Password"
          type="password"
          clearable
          :error-messages="errors.password_confirmation"
        />
      </VCardText>

      <VCardActions class="w-2/3 m-auto mb-4">
        <NuxtLink :to="{ name: 'index' }">
          <VBtn
            text="Annuler"
            variant="outlined"
          />
        </NuxtLink>
        <VBtn
          type="submit"
          color="primary"
          class="flex-1"
          text="Créer"
          variant="tonal"
        />
      </VCardActions>
    </VForm>
  </VCard>
</template>
