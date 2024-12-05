import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Activities from "../views/Activities.vue";
import Auth from "../views/Auth.vue";

const routes = [
    { path: "", redirect: { name: "home" } },
    { path: "/home", name: "home", component: Home },
    { path: "/activities", name: "activities", component: Activities },
    { path: "/auth", name: "auth", component: Auth }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;