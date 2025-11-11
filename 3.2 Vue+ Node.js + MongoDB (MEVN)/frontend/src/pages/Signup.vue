<script setup>
import { ref } from "vue";
import { api } from "../api";
import { auth } from "../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");

async function register() {
  try {
    const res = await api.post("/api/auth/register", {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    auth.login(res.data.user, res.data.token);
    router.push("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
}
</script>

<template>
  <div>
    <h2>Signup</h2>
    <input v-model="username" placeholder="username" />
    <input v-model="email" placeholder="email" />
    <input v-model="password" placeholder="password" type="password" />
    <button @click="register">Sign up</button>
  </div>
</template>
