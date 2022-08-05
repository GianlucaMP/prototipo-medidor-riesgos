<template>
  <div class="recomendaciones">
    <h1>Recomendaciones</h1>
    <div class="row">
      <div class="categorias column-responsive">
        <h2>Categorías</h2>
        <ul class="lista">
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
                    <button @click="cambiarCategoria('20-30m')">
                      20 - 30 m
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

        <h2>Fuentes</h2>
        <ul class="lista fuentes">
          <li>
            <a
              href="https://ebroresilience.com/wp-content/uploads/2020/02/guia-recomendaciones-construccion-y-rehabilitacion-edificaciones-zonas-inundables.pdf"
              target="_blank"
              >Recomendaciones para la construcción en zonas inundables</a
            >
          </li>
          <li>
            <a
              href="https://ri.conicet.gov.ar/bitstream/handle/11336/135214/CONICET_Digital_Nro.cbe5be43-6cc2-4ae8-bec5-5077dbf70a99_E.pdf?sequence=8&isAllowed=y"
              target="_blank"
              >Costas y cuencas de la Región Metropolitana de Buenos Aires:
              estudios, planes y proyectos</a
            >
          </li>
          <li>
            <a
              href="https://es-ar.topographic-map.com/maps/fcxf/La-Plata/"
              target="_blank"
              >Topografia de La Plata</a
            >
          </li>
        </ul>
      </div>
      <div class="column column-responsive">
        <img
          v-bind:src="require('../assets/img-prov-1.png')"
          alt="Imagen provisoria 1"
        />
        <h4>{{ recActual[0].title }}</h4>
        <p>{{ recActual[0].text }}</p>
      </div>
      <div class="column column-responsive">
        <img
          v-bind:src="require('../assets/img-prov-1.png')"
          alt="Imagen provisoria 2"
        />
        <h4>{{ recActual[1].title }}</h4>
        <p>{{ recActual[1].text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
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
        {
          title: "Criterios generales",
          text:
            "Considerar la profundidad y la velocidad que puede llegar a tener el agua durante la inundación, así como la altura interior que puede alcanzar",
          img: ""
        },
        {
          title: "Elevación",
          text:
            "Una posible alternativa es valorar la opción de elevar el edificio o de las partes residenciales del mismo por encima de la cota de inundación. Para lograr esto existen alternativas como: colina o rellenos, muro perimetral de cimentación, muro perimetral no estanco o elevación sobre pilares o pilotes que forman parte de la estructura principal del edificio.",
          img: ""
        }
      ],
      recGeneral: [
        {
          title: "Criterios generales",
          text:
            "Considerar la profundidad y la velocidad que puede llegar a tener el agua durante la inundación, así como la altura interior que puede alcanzar",
          img: ""
        },
        {
          title: "Elevación",
          text:
            "Una posible alternativa es valorar la opción de elevar el edificio o de las partes residenciales del mismo por encima de la cota de inundación. Para lograr esto existen alternativas como: colina o rellenos, muro perimetral de cimentación, muro perimetral no estanco o elevación sobre pilares o pilotes que forman parte de la estructura principal del edificio.",
          img: ""
        }
      ],
      recMuyProbable: [
        {
          title: "Incorporar materiales resistentes al agua y a la corrosión",
          text:
            "Evitar el uso de pavimentos impermeables y priorizar superficies vegetadas que permitan la infiltración. Considerar corrosión en metales, materiales no solubles en agua, deformaciones en madera. Los sellos waterproof y water-resistant garantizan la idoneidad de los materiales.",
          img: ""
        },
        {
          title: "Instalaciones",
          text:
            "Elevar las mismas por encima de la cota máxima de inundación. Reubicar las instalaciones sensibles trasladándolas a plantas superiores o cubierta. • Proteger, estableciendo medidas de seguridad adicionales para aquellas instalaciones que irremediablemente queden por debajo de la cota de inundación.",
          img: ""
        }
      ],
      recPocoProbable: [
        {
          title: "Barreras temporales",
          text:
            "Las barreras temporales son una solución adecuada para zonas con poco espacio, y en lugares donde la instalación de una barrera permanente pueda entorpecer el uso habitual del edificio. Entre ellas existen: sacos o elementos rellenos de agua o arena, diques hinchables, barreras modulares y compuertas estancas mecanizadas.",
          img: ""
        },
        {
          title: "Impermeabilización",
          text:
            "Se debe realizar preferentemente por la cara exterior del elemento para reducir el riesgo de inundación, se recomienda el uso de sistemas de membranas adheridas o de lámina compartimentada. Los principales métodos son lámina impermeabilizante colocada sobre el paramento existente y revestimiento exterior impermeable.",
          img: ""
        }
      ],
      rec0_10m: [
        {
          title: "Ubicación",
          text:
            "Buscar la ubicación más elevada posible, pudiendo incluso recurrir a la generación de montículos resistentes al agua mediante material de relleno debidamente compactado, siempre con la preceptiva aprobación, si se demuestra que no afecta a terceros",
          img: ""
        },
        {
          title: "Alineación",
          text:
            "Facilitar al máximo posible el principio de la transparencia hidráulica, que consiste en permitir de forma controlada el paso libre del agua a través de las edificaciones, sin obstruir su movimiento natural y presentando la menor superficie posible de oposición frente a la avenida, de modo que la dirección longitudinal del edificio coincida con la dirección principal de la corriente y se minimice la presión hidrostática sobre muros y cerramientos. ",
          img: ""
        }
      ],
      rec10_20m: [
        {
          title: "Planificación",
          text:
            "Diseñar la instalación para poder utilizar elementos externos (vehículos eléctricos) como suministro de emergencia hasta el restablecimiento en caso de corte prolongado (energía necesaria para señales de socorro y servicios básicos). ",
          img: ""
        },
        {
          title: "Alineación",
          text:
            "Facilitar al máximo posible el principio de la transparencia hidráulica, que consiste en permitir de forma controlada el paso libre del agua a través de las edificaciones, sin obstruir su movimiento natural y presentando la menor superficie posible de oposición frente a la avenida, de modo que la dirección longitudinal del edificio coincida con la dirección principal de la corriente y se minimice la presión hidrostática sobre muros y cerramientos. ",
          img: ""
        }
      ],
      rec20_30m: [
        {
          title: "Planificación",
          text:
            "Diseñar la instalación para poder utilizar elementos externos (vehículos eléctricos) como suministro de emergencia hasta el restablecimiento en caso de corte prolongado (energía necesaria para señales de socorro y servicios básicos). ",
          img: ""
        },
        {
          title: "Depósito de agua",
          text:
            "Colocación de un depósito de agua por encima de la cota máxima de inundación para evitar la contaminación del agua potable y garantizar el suministro. Deben disponer de sistemas de cierre hermético y estar protegidos de la contaminación aérea.",
          img: ""
        }
      ],
      rec30m: [
        {
          title: "Planificación",
          text:
            "Diseñar la instalación para poder utilizar elementos externos (vehículos eléctricos) como suministro de emergencia hasta el restablecimiento en caso de corte prolongado (energía necesaria para señales de socorro y servicios básicos). ",
          img: ""
        },
        {
          title: "Instalaciones",
          text:
            "Evitar disponer instalaciones o aparatos electrónicos en las plantas bajas. Convendrá ubicar las instalaciones eléctricas en cubierta o en planta técnica, por encima de la cota de inundación. En cualquier caso, se debe evitar su colocación en sótanos",
          img: ""
        }
      ]
    };
  },
  created() {},
  methods: {
    toggleView(e) {
      let li = e.target.closest("li");
      let ul = li.closest("ul"); // let ul = document.getElementById("lista");
      let items = Array.from(ul.children); // alternativa a ul -> li.closest('ul').children
      let index = items.indexOf(li) - 1; //-1 para corregir por la categoría "general"
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
.lista {
  list-style: none;
}

.lista h5 {
  display: inline-block;
}

.lista a {
  text-decoration: none;
  /* color: black;
  font-weight: bolder; */
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

.fuentes {
  list-style: disc;
}

img {
  max-width: 80%;
}

@media screen and (max-width: 1024px) {
  .row {
    flex-direction: column;
    margin: 0 auto;
    max-width: 90%;
  }
  .column-responsive {
    width: 100%;
    margin-left: 0;
  }
  .lista {
    padding-left: 0%;
    list-style-position: inside;
  }
  .lista h5 {
    max-width: 330px;
  }
  .lista span {
    float: inline-start;
  }
  p {
    overflow-x: unset;
  }
}
</style>
