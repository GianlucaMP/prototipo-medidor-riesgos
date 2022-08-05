<template>
  <div class="ayuda">
    <h1>Seccion de ayuda y preguntas frecuentes</h1>
    <h4>
      Aqui podras obtener informacion en detalle sobre las secciones del sitio y
      como usar las distintas funcionalidades en ellas disponibles
    </h4>
    <ul id="lista">
      <li @click="toggleView">
        <button class="material-symbols-outlined no-border">
          {{ icons[0] }}
        </button>
        <h5>Como uso el mapa?</h5>
        <transition name="fade">
          <p v-show="visibility[0]">
            Sencillo, selecciona el filtro de altitud o inundabilidad segun tu
            interes, ingresas una direccion en el buscador de direcciones, le
            das a enter y listo, un marcador aparecera en el mapa. Tambien podes
            hacer que el marcador aparezca directamente haciendo click sobre el
            lugar de tu interes en el mapa.
          </p>
        </transition>
      </li>
      <li @click="toggleView">
        <button class="material-symbols-outlined no-border">
          {{ icons[1] }}
        </button>
        <h5>Como ingreso una direccion?</h5>
        <transition name="fade">
          <p v-show="visibility[1]">
            Si deseas usar la entrada de texto para buscar la direccion, es
            recomendable usar el formato (numero, calle, ciudad). Tambien podes
            navegar en el mapa interactivo y marcar el lugar haciendo click
          </p>
        </transition>
      </li>
      <li @click="toggleView">
        <button class="material-symbols-outlined no-border">
          {{ icons[2] }}
        </button>
        <h5>Que dice en el detalle de cada marcador?</h5>
        <transition name="fade">
          <p v-show="visibility[2]">
            Dice la direccion del lugar marcado, el nivel de inundabilidad o
            altura segun que filtro se haya selecicnado. En ambos casos hay un
            enlace <a href="#">Ver Mas...</a> que te redirige al detalle de la
            recomendacion de seguridad para la construccion en el lugar
          </p>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
const expand_more = "expand_more";
const expand_less = "expand_less";

export default {
  name: "Ayuda",
  data() {
    return {
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

@media screen and (max-width: 1024px) {
  #lista {
    padding-left: 0%;
  }
  #lista span {
    float: inline-start;
  }
}

@media screen and (min-width: 400px) and (max-width: 1024px) {
  #lista h5 {
    max-width: 90%;
  }
}

@media screen and (max-width: 400px) {
  #lista h5 {
    max-width: 80%;
  }
}

/* @media screen and (max-width: 640px) {
  #lista h5 {
    max-width: 300px;
  }
} */
</style>
