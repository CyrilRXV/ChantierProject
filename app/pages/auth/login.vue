<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

definePageMeta({
  layout: 'login',
  middleware: ['sanctum:guest']
});
const loginError = ref<string | null>(null);
const { login } = useSanctumAuth();

const { errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z
        .string()
        .min(1, { message: $t('error.login.minMail') })
        .email({ message: $t('error.login.mail') }),
      password: z
        .string()
        .min(1, { message: $t('error.login.password') })
        .min(3, $t('error.login.minPassword'))
    })
  ),
  initialValues: { email: '', password: '' }
});

const onSubmit = handleSubmit(async (values): Promise<void> => {
  loginError.value = null;
  try {
    await login(values);
  } catch {
    loginError.value = $t('error.login.error');
  }
});

const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false });
const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: false });
</script>

<template>
  <v-container class="d-flex justify-center">
    <v-card
      prepend-icon="mdi-account"
      title="Connexion-vous"
      class="text-center mt-16 w-33 border"
      rounded="xl"
    >
      <v-form @submit="onSubmit">
        <div
          v-if="loginError"
          class="error-message"
        >
          {{ loginError }}
        </div>
        <v-card-text>
          <v-text-field
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            :label="$t('base.login.mail')"
            clearable
            :error-messages="errors.email"
          />
          <v-text-field
            v-model="password"
            v-bind="passwordAttrs"
            type="password"
            :label="$t('base.login.password')"
            clearable
            :error-messages="errors.password"
          />
        </v-card-text>

        <v-card-actions class="d-flex justify-space-between pa-8">
          <v-btn
            class="border-md"
            color="secondary"
            text="Demo"
            size="x-large"
            variant="tonal"
            :to="{ name: 'dashboard' }"
          />
          <v-btn
            class="border-md"
            type="submit"
            color="primary"
            text="Connexion"
            variant="tonal"
            :disabled="isSubmitting"
          >
            {{ $t('base.login.connexion') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
  <v-btn
    class="d-flex justify-center"
    color="tertiary"
    size="x-large"
    variant="plain"
    :to="{ name: 'auth-register' }"
  >
    {{ $t('base.register.register') }}
  </v-btn>
</template>

<style scoped>
.error-message {
  background-color: #f3e5e5;
  color: #dc2626;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
