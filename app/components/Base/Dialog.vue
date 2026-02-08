<script setup lang="ts">
const showConfirmDialog = defineModel<boolean>('showConfirmDialog', { default: false });
</script>

<template>
  <v-dialog
    v-model="showConfirmDialog"
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
        <slot name="title">
          <span class="text-h5 font-weight-bold" />
        </slot>
      </v-card-title>
      <v-card-text class="pa-6">
        <div
          class="space-y-2"
        >
          <div
            v-if="$slots.nameTitleField"
            class="d-flex"
          >
            <strong class="mr-2">
              <slot name="nameTitleField" />
            </strong>
            <span v-if="$slots.nameField">
              <slot name="nameField" />
            </span>
            <span v-else>
              'Non spécifié'
            </span>
          </div>

          <div
            v-if="$slots.emailTitleField"
            class="d-flex"
          >
            <strong class="mr-2">
              <slot name="emailTitleField" />
            </strong>
            <span v-if="$slots.emailField">
              <slot name="emailField" />
            </span>
            <span v-else>
              'Non spécifié'
            </span>
          </div>

          <div
            v-if="$slots.clientTitleField"
            class="d-flex"
          >
            <strong class="mr-2">
              <slot name="clientTitleField" />
            </strong>
            <span v-if="$slots.clientField">
              <slot name="clientField" />
            </span>
            <span v-else>
              'Non spécifié'
            </span>
          </div>

          <div
            v-if="$slots.contactTitleField"
            class="d-flex"
          >
            <strong class="mr-2">
              <slot name="contactTitleField" />
            </strong>
            <span v-if="$slots.contactField">
              <slot name="contactField" />
            </span>
            <span v-else>
              'Non spécifié'
            </span>
          </div>

          <div
            v-if="$slots.adressTitleField"
            class="d-flex"
          >
            <strong class="mr-2">
              <slot name="adressTitleField" />
            </strong>
            <span v-if="$slots.adressField">
              <slot name="adressField" />
            </span>
            <span v-else>
              'Non spécifié'
            </span>
          </div>

          <div
            v-if="$slots.phoneTitleField"
            class="d-flex"
          >
            <strong class="mr-2">
              <slot name="phoneTitleField" />
            </strong>
            <span v-if="$slots.phoneField">
              <slot name="phoneField" />
            </span>
            <span v-else>
              'Non spécifié'
            </span>
          </div>

          <div
            v-if="$slots.dateStartTitleField || $slots.dateEndTitleField"
            class="d-flex flex-column"
          >
            <div class="d-flex flex-row">
              <strong class="mr-2">
                <slot name="dateStartTitleField" />
              </strong>
              <span v-if="$slots.dateStartField">
                <slot name="dateStartField" />
              </span>
              <span v-else>
                'Non spécifié'
              </span>
            </div>
            <div class="d-flex flex-row">
              <div class="d-flex flex-row">
                <strong class="mr-2">
                  <slot name="dateEndTitleField" />
                </strong>
                <span v-if="$slots.dateEndField">
                  <slot name="dateEndField" />
                </span>
                <span v-else>
                  'Non spécifié'
                </span>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="pa-6 pt-0">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
