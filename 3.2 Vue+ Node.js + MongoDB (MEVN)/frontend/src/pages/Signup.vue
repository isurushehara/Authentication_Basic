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
  <div class="auth-page">
    <div class="auth-card">
      <h2>Sign up</h2>
      <input v-model="username" placeholder="username" />
      <input v-model="email" placeholder="email" />
      <input v-model="password" placeholder="password" type="password" />
      <button class="btn" @click="register">Sign up</button>
      <div class="auth-nav">
        Already have an account? <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>
