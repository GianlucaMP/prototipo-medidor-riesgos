+<template>
  <div class="recomendaciones">
    <h1>Recomendaciones</h1>
    <div class="row">
      <div class="categorias">
        <h2>Categorías</h2>
        <ul id="lista">
          <li @click="toggleView">
            <h5>General</h5>
          </li>
          <li @click="toggleView">
            <span class="material-symbols-outlined">
              {{ icons[0] }}
            </span>
            <h5>Inundabilidad</h5>
            <transition name="fade">
              <div v-show="visibility[0]">
                <p>Muy probable</p>
                <p>Poco probable</p>
              </div>
            </transition>
          </li>
          <li @click="toggleView">
            <span class="material-symbols-outlined">
              {{ icons[1] }}
            </span>
            <h5>Altitud</h5>
            <transition name="fade">
              <div v-show="visibility[1]">
                <p>0 - 10 m</p>
                <p>10 - 20 m</p>
                <p>20 - 30 m</p>
                <p>30+ m</p>
              </div>
            </transition>
          </li>
        </ul>
      </div>
      <div class="column">
        <img
          v-bind:src="require('../assets/proxy.jpg')"
          alt="Imagen de ejemplo"
        />
        <h4>Recomendación 1</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div class="column">
        <img
          v-bind:src="require('../assets/proxy.jpg')"
          alt="Imagen de ejemplo"
        />
        <h4>Recomendación 2</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
const expand_more = "expand_more";
const expand_less = "expand_less";

export default {
  name: "Recomendaciones",
  data() {
    return {
      msg: "Recomendaciones",
      items: [],
      visibility: [false, false, false],
      icons: [expand_more, expand_more, expand_more]
    };
  },
  created() {},
  methods: {
    toggleView(e) {
      let li = e.target.closest("li");
      let ul = document.getElementById("lista");
      let items = Array.from(ul.children); // alternativa a ul -> li.closest('ul').children
      let index = items.indexOf(li);
      this.test = !this.test;   //???
      this.$set(this.visibility, index, !this.visibility[index]); //Shorthand de Vue.set
      if (this.visibility[index]) {
        this.icons[index] = expand_less;
      } else {
        this.icons[index] = expand_more;
      }
    }
  }
};
</script>

<style>
.ayuda {
  text-align: left;
  margin-left: 30px;
  padding-left: 0; /* Bootstrap por defecto te pone padding de 40px */
}
#lista {
  list-style: none;
}

#lista h5 {
  /* border: ; */
  display: inline-block;
}

/* Efectos de prueba */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.categorias{
  text-align: left;
  width: 18%;
  float: left;
  margin-left: 60px;
}

.column {
  float: left;
  width: 32%;
  margin-left: 20px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

@media screen and (max-width: 1024px) {
  #lista {
    padding-left: 0%;
  }
  #lista h5 {
    max-width: 330px;
  }
  #lista span {
    float: inline-start;
  }
}
</style>

