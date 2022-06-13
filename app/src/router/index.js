import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Home from "@/components/Home";
import Mapa from "@/components/Mapa";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/home",
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
