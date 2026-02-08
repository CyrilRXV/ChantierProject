<script setup lang="ts">
import { useForm } from 'vee-validate';
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
        .min(1, { message: $t('error.register.name') })
        .min(3, { message: $t('error.register.minName') })
        .max(25, { message: $t('error.register.maxName') }),
      email: z
        .string()
        .min(1, { message: $t('error.login.mail') })
        .email({ message: $t('error.login.minMail') }),
      password: z
        .string()
        .min(1, { message: $t('error.login.password') })
        .min(3, $t('error.login.minPassword')),
      password_confirmation: z
        .string()
        .min(1, { message: $t('error.register.password') })
    }).refine(data => data.password === data.password_confirmation, {
      message: $t('error.register.confPassword'),
      path: ['password_confirmation']
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
  <v-container class="d-flex justify-center">
    <VCard
      prepend-icon="mdi-account"
      :title="$t('base.register.title')"
      class="text-center mt-16 w-33 border"
      rounded="xl"
    >
      <VForm @submit.prevent="onSubmit">
        <VCardText>
          <VTextField
            v-model="name"
            v-bind="nameAttrs"
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
            label="Password*"
            type="password"
            clearable
            :error-messages="errors.password"
          />
          <VTextField
            v-model="password_confirmation"
            v-bind="password_confirmationAttrs"
            label="Confirm Password"
            type="password"
            clearable
            :error-messages="errors.password_confirmation"
          />
        </VCardText>

        <VCardActions class="d-flex justify-end pa-8">
          <NuxtLink :to="{ name: 'index' }">
            <VBtn
              text="Annuler"
              variant="outlined"
            />
          </NuxtLink>
          <VBtn
            class="w-50 border-md"
            type="submit"
            color="primary"
            text="Créer"
            variant="tonal"

          />
        </VCardActions>
      </VForm>
    </VCard>
  </v-container>
</template>
