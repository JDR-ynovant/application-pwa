import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/game",
    name: "Game",
    component: () => import(/* webpackChunkName: "game" */ "../views/Game.vue"),
  },
  {
    path: "/create",
    name: "Create",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Create.vue"),
  },
  {
    path: "/join",
    name: "Join",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Join.vue"),
  },
  {
    path: "/join/:id",
    props: true,
    name: "JoinGame",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/JoinGame.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
