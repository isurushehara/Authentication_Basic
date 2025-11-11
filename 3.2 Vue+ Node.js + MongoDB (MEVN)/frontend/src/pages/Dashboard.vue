<script setup>
import { ref, onMounted } from "vue";
import { api } from "../api";
import { auth } from "../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const message = ref("");

onMounted(async () => {
  try {
    const token = auth.getToken();

    const res = await api.get("/api/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });

    message.value = res.data.message;
  } catch (err) {
    alert("Session expired");
    auth.logout();
    router.push("/login");
  }
});
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-card">
      <h2>Dashboard</h2>
      <p>{{ message }}</p>
      <button class="btn" @click="auth.logout(); $router.push('/login')">Logout</button>
    </div>
  </div>
</template>
