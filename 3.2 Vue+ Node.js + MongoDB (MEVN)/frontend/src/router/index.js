import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";

const isLoggedIn = () => !!localStorage.getItem("token");

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) next();
      else next("/login");
    },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
