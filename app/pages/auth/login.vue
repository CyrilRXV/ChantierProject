<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

definePageMeta({
  layout: 'login',
  middleware: ['sanctum:guest']
});
const { login } = useSanctumAuth();

const { errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z
        .string()
        .min(1, { message: 'L\'email est requis' })
        .email({ message: 'L\'email doit être valide' }),
      password: z
        .string()
        .min(1, { message: 'Le mot de passe est requis' })
        .min(3, 'Le mot de passe est trop court')
    })
  ),
  initialValues: { email: '', password: '' }
});
const onSubmit = handleSubmit(async (values): Promise<void> => {
  try {
    await login(values);
  } catch (error: any) {

  }
});

const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false });
const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: false });
</script>

<template>
  <v-card
    prepend-icon="mdi-account"
    title="Connexion"
    class="text-center mt-16 max-w-2xl m-auto"
    rounded="xl"
  >
    <v-form @submit="onSubmit">
      <v-card-text>
        <v-text-field
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          class="w-2/3 m-auto"
          label="Email"
          clearable
          :error-messages="errors.email"
        />
        <v-text-field
          v-model="password"
          v-bind="passwordAttrs"
          class="w-2/3 m-auto"
          type="password"
          label="Mot de passe"
          clearable
          :error-messages="errors.password"
        />
      </v-card-text>

      <v-card-actions
        class="w-2/3 m-auto mb-4"
      >
        <nuxt-link :to="{ name: 'index' }">
          <v-btn
            text="Annuler"
            variant="outlined"
          />
        </nuxt-link>
        <v-btn
          type="submit"
          color="primary"
          class="flex-1"
          text="Connexion"
          variant="tonal"
          :disabled="isSubmitting"
        />
      </v-card-actions>
    </v-form>
  </v-card>
</template>
