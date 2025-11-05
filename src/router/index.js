import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import OrderPage from "../pages/OrderPage.vue";
import ReturnPage from "../pages/ReturnPage.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/order", name: "OrderPage", component: OrderPage },
  { path: "/return", name: "ReturnPage", component: ReturnPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
