import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Activities from "../views/Activities.vue";
import Auth from "../views/Auth.vue";
import Profile from "../views/Profile.vue";
import Courts from "../views/Courts.vue";
import ProfileEdit from "../views/ProfileEdit.vue";
import { profileEditGuard } from "../shared/guards/profile.guard";
import Details from "../views/Details.vue";
import { loggedGuard } from "../shared/guards/logged.guard";
import Inscription from "../views/InscriptionsInstructor.vue";

const routes = [
  { path: "", redirect: { name: "home" } },
  { path: "/home", name: "home", component: Home },
  { path: "/activities", name: "activities", component: Activities },
  { path: "/auth", name: "auth", component: Auth, beforeEnter: loggedGuard },
  { path: "/profile/:username", name: "profile", component: Profile },
  { path: "/courts", name: "courts", component: Courts },
  { path: "/inscriptions", name: "inscriptions", component: Inscription },
  { path: "/profile/:username/edit", name: "edit-profile", component: ProfileEdit, beforeEnter: profileEditGuard },
  { path: "/activities/:slug", name: "details", component: Details },
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;