<template>
  <div class="about">
    <h1>Hola, aqui podras ver un mapa con la informacion sobre el terreno</h1>
    <div class="">
      <div id="barraBusqueda">
        <label for="direccion">Buscar Direccion: </label>
        <input
          id="direccion"
          type="text"
          v-model="form.search"
          placeholder="Av. 44 y 7"
          @keyup="searchAddress"
        />
        <!-- <div id="direccion"></div> -->
        <label for="filtro">Filtro: </label>
        <select
          id="filtro"
          name="filtro"
          v-model="form.mapa_id"
          @change="setMapFilter"
        >
          <option value="mapa">Mapa</option>
          <option value="mapa_base">Mapa Base</option>
          <option value="mapa_inundaciones">Mapa de inundaciones</option>
          <option value="mapa_inundaciones_2">Mapa de inundaciones 2</option>
          <option value="mapa_altitud">Mapa de altitud</option>
        </select>
      </div>
    </div>
    <div id="map-container" style="height: 800px; width: 100%">
      <!-- <div style="height: 200px overflow: auto;"></div> -->
      <l-map
        ref="map"
        style="height: 85%; width: 95%; margin: auto"
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @click="onMapClick"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <!-- <l-marker :lat-lng="marker"></l-marker> -->
        <l-control position="bottomleft"></l-control>
      </l-map>
      <div class="m-3">
        <router-link class="btn btn-light" to="/">Volver</router-link>
      </div>
    </div>
  </div>

  <!-- <div>
    <ul>
      <li>Direccion: ${address}</li>
      <li><b>Zona: Inundable</b></li>
    </ul>
  </div> -->
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LControl } from "vue2-leaflet";
import poligonos from "../resources/poligonos";
import { geoContains } from "d3-geo";
const GeoJsonGeometriesLookup = require("geojson-geometries-lookup");

import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
const provider = new OpenStreetMapProvider();

// const search = new GeoSearchControl({
//   provider: provider
//   //,style: "bar"
// });

export default {
  name: "Mapa",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControl
  },
  data() {
    return {
      map: null,
      zoom: 14,
      center: latLng(-34.920457, -57.953536),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      marker: latLng(-34.920457, -57.953536),
      geojsonFeature: null,
      jsonLayer: null,
      form: {
        search: "",
        mapa_id: "mapa"
      }
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;
      // this.map.addControl(search);

      // document
      //   .getElementById("direccion")
      //   .appendChild(document.querySelector(".geosearch"));
    });
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    async onMapClick(e) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      let latlng = e.latlng;

      let inundable = "Sin Comentarios";
      if (this.geojsonFeature != null) {
        const glookup = new GeoJsonGeometriesLookup(this.geojsonFeature);
        const point = { type: "Point", coordinates: [latlng.lng, latlng.lat] };
        if (glookup.countContainers(point)) {
          console.log("Está dentro");
          inundable = "Inundable";
        } else {
          console.log("Está fuera");
          inundable = "Segura";
        }
      }
      let address;
      await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`
      )
        .then(response => response.json())
        .then(data => {
          address = data.display_name;
        });
      let texto = `<div><ul><li>Direccion: ${address}</li><li><b>Zona: ${inundable}</b></li></ul></div>`;
      this.marker = new L.marker(latlng).addTo(this.map);
      this.marker.bindPopup(texto).openPopup();
    },
    setMap(id) {
      this.geojsonFeature = poligonos[id];
    },
    setMapFilter() {
      if (this.jsonLayer) {
        this.jsonLayer.clearLayers();
        this.map.removeLayer(this.jsonLayer);
        this.jsonLayer = null;
        this.geojsonFeature = null;
      }
      this.setMap(this.form.mapa_id);
      console.log(this.geojsonFeature);
      this.jsonLayer = L.geoJSON(this.geojsonFeature, {
        style: this.style
      }).addTo(this.map);
      // this.jsonLayer = L.geoJSON(this.geojsonFeature).addTo(this.map);
    },
    getColor(d) {
      return d > 1000
        ? "#800026"
        : d > 500
        ? "#BD0026"
        : d > 200
        ? "#E31A1C"
        : d > 100
        ? "#FC4E2A"
        : d > 50
        ? "#FD8D3C"
        : d > 20
        ? "#FEB24C"
        : d > 10
        ? "#FED976"
        : "#FFEDA0";
    },
    style(feature) {
      if ("mapa_inundaciones" == this.form.mapa_id) {
        return {
          // stroke: false,
          fillColor: this.getColor(feature.properties.altura),
          weight: 2,
          opacity: 1,
          color: "black",
          dashArray: "3",
          fillOpacity: 0.7
        };
      } else {
        return {
          stroke: false,
          fillColor: "blue",
          weight: 2,
          opacity: 1,
          color: "black",
          dashArray: "3",
          fillOpacity: 0.3
        };
      }
    },
    async searchAddress(e) {
      if (e.key == "Enter") {
        const results = await provider.search({ query: this.form.search });
        console.log(results); // results es un array
        const { x: long, y: lat, label: address } = results[0];
        console.log(results[0].raw);
        // let coso = L.latLng([lat, long]);
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = new L.marker([lat, long]).addTo(this.map);
        this.marker.bindPopup(address).openPopup();
      }
    }
  }
};
</script>

<style>
#barraBusqueda {
  /* margin: 20px; */
  margin: 20px auto;
  width: 95%;
  display: flex;
}

#barraBusqueda input {
  margin-right: 10px;
}
</style>
