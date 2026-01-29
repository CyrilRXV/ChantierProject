<script lang="ts" setup>
import axios from "axios";

const login = async () => {
  await axios.get("http://localhost/sanctum/csrf-cookie", {
    withCredentials: true,
    withXSRFToken: true,
  });

  const response = await axios.post("http://localhost/login", {
    email: 'test@example.com',
    password: 'password'
  }, {
    headers: {
      "accept": "application/json",
      "content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
  });
  console.log(response);
}

</script>

<template>
  <div>
    <v-btn @click="login">
      login
    </v-btn>
  </div>
</template>
>