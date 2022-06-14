<template>
  <div class="about">
    <h1>Hola extraño, aqui podras ver un mapa con los centros</h1>
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
      map: null,
      zoom: 14,
      center: latLng(-34.920457, -57.953536),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      marker: latLng(-34.920457, -57.953536)
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
    }
  }
};
</script>
