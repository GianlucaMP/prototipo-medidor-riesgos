<template>
  <div class="about">
    <h1>Hola extraño, aqui podras ver un mapa con los centros</h1>
    <div style="height: 800px; width: 100%">
      <div style="height: 200px overflow: auto;"></div>
      <l-map
        style="height: 85%; width: 95%; margin: auto"
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          v-for="centro in centros"
          :lat-lng="[centro.latitud, centro.longitud]"
          v-bind:key="centro.id"
        >
          <l-popup>
            <h2>{{ centro.nombre }}</h2>
            <p>Direccion: {{ centro.direccion }}</p>
            <p>
              Horario: {{ centro.hora_apertura }} - {{ centro.hora_cierre }}
            </p>
            <p v-if="centro.telefono != ''">Telefono: {{ centro.telefono }}</p>
            <p v-else>Telefono: -</p>
            <button
              class="btn btn-info ml-3"
              v-on:click="pedirTurno(centro.id)"
            >
              Hacer reserva
            </button>
          </l-popup>
        </l-marker>
      </l-map>
      <div class="m-3">
        <router-link class="btn btn-light" to="/">Volver</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

export default {
  name: "Mapa",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },

  data() {
    return {
      zoom: 14,
      center: latLng(-34.920457, -57.953536),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      centros: []
    };
  },
  created() {
    fetch("https://admin-grupo44.proyecto2020.linti.unlp.edu.ar/api/centrosAll")
      .then(response => response.json())
      .then(json => {
        this.centros = json.centros.filter(function(centro) {
          return centro.latitud;
        });
      });
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    pedirTurno(id) {
      this.$router.push("/centro/" + id + "/reservas");
    }
  }
};
</script>
