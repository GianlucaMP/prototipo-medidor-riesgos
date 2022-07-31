<template>
  <div class="recomendaciones">
    <h1>Recomendaciones</h1>
    <div class="row">
      <div class="categorias">
        <h2>Categorías</h2>
        <ul id="lista">
          <li @click="toggleView">
            <button
              style="font-size: 1.4rem"
              @click="cambiarCategoria('General')"
            >
              General
            </button>
          </li>
          <li @click="toggleView">
            <button class="material-symbols-outlined no-border">
              {{ icons[0] }}
            </button>
            <h5>Inundabilidad</h5>
            <ul>
              <transition name="fade">
                <div v-show="visibility[0]">
                  <li>
                    <button @click="cambiarCategoria('Muy probable')">
                      Muy probable
                    </button>
                  </li>
                  <li>
                    <button @click="cambiarCategoria('Poco probable')">
                      Poco probable
                    </button>
                  </li>
                </div>
              </transition>
            </ul>
          </li>
          <li @click="toggleView">
            <button class="material-symbols-outlined no-border">
              {{ icons[1] }}
            </button>
            <h5>Altitud</h5>
            <ul>
              <transition name="fade">
                <div v-show="visibility[1]">
                  <li>
                    <button @click="cambiarCategoria('0-10m')">0 - 10 m</button>
                  </li>
                  <li>
                    <button @click="cambiarCategoria('10-20m')">
                      10 - 20 m
                    </button>
                  </li>
                  <li>
                    <button @click="cambiarCategoria('10-20m')">
                      10 - 20 m
                    </button>
                  </li>
                  <li>
                    <button @click="cambiarCategoria('30+m')">30+ m</button>
                  </li>
                </div>
              </transition>
            </ul>
          </li>
        </ul>
      </div>
      <div class="column">
        <img
          v-bind:src="require('../assets/proxy.jpg')"
          alt="Imagen de ejemplo"
        />
        <h4>{{ recActual[0].title }}</h4>
        <p>{{ recActual[0].text }}</p>
      </div>
      <div class="column">
        <img
          v-bind:src="require('../assets/proxy.jpg')"
          alt="Imagen de ejemplo"
        />
        <h4>{{ recActual[1].title }}</h4>
        <p>{{ recActual[1].text }}</p>
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
      icons: [expand_more, expand_more, expand_more],
      catActual: "General",
      recActual: [
        { title: "General A", text: "texto rec a", img: "" },
        { title: "General B", text: "texto rec B", img: "" }
      ],
      recGeneral: [
        { title: "General A", text: "texto rec a", img: "" },
        { title: "General B", text: "texto rec B", img: "" }
      ],
      recMuyProbable: [
        { title: "Muy Probable A", text: "texto rec a", img: "" },
        { title: "Muy Probable B", text: "texto rec B", img: "" }
      ],
      recPocoProbable: [
        { title: "Poco Probable A", text: "texto rec a", img: "" },
        { title: "Poco Probable B", text: "texto rec B", img: "" }
      ],
      rec0_10m: [
        { title: "0_10m A", text: "texto rec a", img: "" },
        { title: "0_10m B", text: "texto rec B", img: "" }
      ],
      rec10_20m: [
        { title: "10_20m A", text: "texto rec a", img: "" },
        { title: "10_20m B", text: "texto rec B", img: "" }
      ],
      rec20_30m: [
        { title: "20_30m A", text: "texto rec a", img: "" },
        { title: "20_30m B", text: "texto rec B", img: "" }
      ],
      rec30m: [
        { title: "30+m A", text: "texto rec a", img: "" },
        { title: "30+m B", text: "texto rec B", img: "" }
      ]
    };
  },
  created() {},
  methods: {
    toggleView(e) {
      let li = e.target.closest("li");
      let ul = document.getElementById("lista");
      let items = Array.from(ul.children); // alternativa a ul -> li.closest('ul').children
      let index = items.indexOf(li) - 1; //-1 para corregir por la categoría "general"
      this.test = !this.test; //???
      this.$set(this.visibility, index, !this.visibility[index]); //Shorthand de Vue.set
      if (this.visibility[index]) {
        this.icons[index] = expand_less;
      } else {
        this.icons[index] = expand_more;
      }
    },
    cambiarCategoria(cat) {
      this.catActual = cat;
      if (cat === "General") this.recActual = this.recGeneral;
      else if (cat === "Muy probable") this.recActual = this.recMuyProbable;
      else if (cat === "Poco probable") this.recActual = this.recPocoProbable;
      else if (cat === "0-10m") this.recActual = this.rec0_10m;
      else if (cat === "10-20m") this.recActual = this.rec10_20m;
      else if (cat === "20-30m") this.recActual = this.rec20_30m;
      else if (cat === "30+m") this.recActual = this.rec30m;
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

li button {
  padding: 0;
  border: none;
  background: none;
}

.categorias {
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
