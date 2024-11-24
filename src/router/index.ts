import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Activities from "../views/Activities.vue";

const routes = [
    { path: "", redirect: { name: "home" } },
    { path: "/home", name: "home", component: Home },
    { path: "/activities", name: "activities", component: Activities },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;