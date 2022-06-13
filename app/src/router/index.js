import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Mapa from "@/components/Mapa";

Vue.use(Router);

export default new Router({
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
    }
  ]
});
