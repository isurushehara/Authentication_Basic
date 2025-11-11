<script setup>
import { ref } from "vue";
import { api } from "../api";
import { auth } from "../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const identifier = ref("");
const password = ref("");

async function login() {
  try {
    const res = await api.post("/api/auth/login", {
      identifier: identifier.value,
      password: password.value,
    });

    auth.login(res.data.user, res.data.token);
    router.push("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
}
</script>

<template>
  <div>
    <h2>Login</h2>
    <input v-model="identifier" placeholder="username or email" />
    <input v-model="password" placeholder="password" type="password" />
    <button @click="login">Login</button>
  </div>
</template>
