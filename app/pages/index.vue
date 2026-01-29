<script lang="ts" setup>
definePageMeta({
  middleware: ['authenticated']
});

const { user, clear: clearSession } = useUserSession();

async function logout() {
  await clearSession();
  await navigateTo('/auth/login');
}
</script>

<template>
  <div>
    <h1>Welcome</h1>
    <button @click="logout">
      Logout
    </button>
    <Dashboard />
  </div>
</template>
