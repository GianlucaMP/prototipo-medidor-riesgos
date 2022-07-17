import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Mapa from "@/components/Mapa";
import Recomendaciones from "@/components/Recomendaciones";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/mapa",
      name: "Mapa",
      component: Mapa
    },
    {
      path: "/recomendaciones",
      name: "Recomendaciones",
      component: Recomendaciones
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
  }
});
