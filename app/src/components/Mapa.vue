<template>
  <div class="about">
    <h1>Hola, aqui podras ver un mapa con los centros</h1>
    <input type="text" v-model="input" placeholder="Buscar dirección..." />
    <div style="height: 800px; width: 100%">
      <div style="height: 200px overflow: auto;"></div>
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
        <l-control position="topright">
          <button @click="clickHandler">
            Zonas Inundables
          </button>
        </l-control>
      </l-map>
      <div class="m-3">
        <router-link class="btn btn-light" to="/">Volver</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LControl } from "vue2-leaflet";
import poligonos from "../resources/poligonos";

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
      jsonLayer: null
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;
    });
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    onMapClick(e) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      let latlng = e.latlng;
      this.marker = new L.marker(latlng).addTo(this.map);
      this.marker
        .bindPopup("<b>Este marcador se encuentra:</b><br>" + latlng.toString())
        .openPopup();

      // var myLayer = L.geoJSON().addTo(this.map);
      // myLayer.addData(this.geojsonFeature);
    },
    clickHandler() {
      if (this.jsonLayer) {
        this.jsonLayer.clearLayers();
        this.map.removeLayer(this.jsonLayer);
        this.jsonLayer = null;
        this.geojsonFeature = null;
      } else {
        this.geojsonFeature = poligonos.la_plata_1;
        this.jsonLayer = L.geoJSON(this.geojsonFeature, {
          style: this.style
        }).addTo(this.map);
        // this.jsonLayer = L.geoJSON(this.geojsonFeature).addTo(this.map);
      }
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
      return {
        // stroke: false,
        fillColor: this.getColor(feature.properties.altura),
        weight: 2,
        opacity: 1,
        color: "black",
        dashArray: "3",
        fillOpacity: 0.7
      };
    }
  }
};
</script>
