<script lang="ts" setup>
import { items, itemsUser } from '~/datas/NavBarItems';
import logo from '~/assets/images/LogoChantier.png';
</script>

<template>
  <v-app-bar>
    <NuxtLink to="/">
      <v-img
        :src="logo"
        :width="294"
        cover
      />
    </NuxtLink>
    <template #append>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            icon="mdi-dots-vertical"
            v-bind="props"
            variant="text"
          />
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in itemsUser"
            :key="i"
            :value="item"
          >
            <template #prepend>
              <v-icon :icon="item.icon" />
            </template>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.route"
        :value="item"
        router
      >
        <template #prepend>
          <v-icon :icon="item.icon" />
        </template>
        <v-list-item-action>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
