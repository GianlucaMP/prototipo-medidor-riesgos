<template>
  <div class="ayuda">
    <h1>Seccion de ayuda y preguntas frecuentes</h1>
    <h4>
      Aqui podras obtener informacion en detalle sobre las secciones del sitio y
      como usar las distintas funcionalidades en ellas disponibles
    </h4>
    <ul id="lista">
      <li @click="toggleView">
        <h5>Como uso el mapa?</h5>
        <p v-show="visibility[0]">
          Sencillo, selecciona el filtro de altitud o inundabilidad segun tu
          interes, ingresas una direccion en el buscador de direcciones, le das
          a enter y listo, un marcador aparecera en el mapa. Tambien podes hacer
          que el marcador aparezca directamente haciendo click sobre el lugar de
          tu interes en el mapa.
        </p>
      </li>
      <li @click="toggleView">
        <h5>Como ingreso una direccion?</h5>
        <p v-show="visibility[1]">
          Si deseas usar la entrada de texto para buscar la direccion, es
          recomendable usar el formato (numero, calle, ciudad). Tambien podes
          navegar en el mapa interactivo y marcar el lugar haciendo click
        </p>
      </li>
      <li @click="toggleView">
        <h5>Que dice en el detalle de cada marcador?</h5>
        <p v-show="visibility[2]">
          Dice la direccion del lugar marcado, el nivel de inundabilidad o
          altura segun que filtro se haya selecicnado. En ambos casos hay un
          enlace <a href="#">Ver Mas...</a> que te redirige al detalle de la
          recomendacion de seguridad para la construccion en el lugar
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Ayuda",
  data() {
    return {
      items: [],
      visibility: [false, false, false],
      test: true
    };
  },
  created() {},
  methods: {
    toggleView(e) {
      let li = e.target.closest("li");
      let ul = document.getElementById("lista");
      let items = Array.from(ul.children); // alternativa a ul -> li.closest('ul').children
      let index = items.indexOf(li);
      this.test = !this.test;
      this.$set(this.visibility, index, !this.visibility[index]); //Shorthand de Vue.set
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
ul {
  list-style: none;
}

#lista h5 {
  /* border: ; */
}
</style>
