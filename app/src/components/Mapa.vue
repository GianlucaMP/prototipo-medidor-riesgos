<template>
  <div class="about">
    <!-- <router-link class="headers" :to="{ name: 'Recomendaciones', hash: '#ra' }">
      Availability
    </router-link> -->
    <h1>Hola, aqui podras ver un mapa con la informacion sobre el terreno</h1>
    <div class="">
      <div id="barraBusqueda">
        <label for="direccion">Buscar Direccion: </label>
        <input
          id="direccion"
          type="text"
          v-model="form.search"
          placeholder="Numero, Calle, Ciudad"
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
          <!-- <option value="mapa_base">Mapa Base</option>
          <option value="mapa_inundaciones">Mapa de inundaciones</option> -->
          <option value="mapa_inundaciones_simple"
            >Mapa de inundaciones simple</option
          >
          <option value="mapa_altitud">Mapa de altitudes</option>
          <!-- <option value="mapa_altitud">Mapa de altitud</option> -->
        </select>
        <label for="descripcion-filtro">Descripcion: </label>
        {{ form.descripcion }}
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
        <!-- <l-control position="topright">
          <div id="map-data-descriptor">
            <span
              ><b
                >Informacion: <br />
                {{ infoText }}</b
              ></span
            >
          </div>
        </l-control> -->
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
const GeoJsonGeometriesLookup = require("geojson-geometries-lookup");

import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
const provider = new OpenStreetMapProvider();

const getDetalle = (address, info) => {
  return `<div>
            <ul>
              <li><b>Direccion</b>: ${address}</li>
              <li><b>${info}</b></li>
              <li><a href="/#/recomendaciones">Ver mas</a></li>
            </ul>
          </div>`;
};
const legend = L.control({ position: "topright" });

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
      geojsonFeature: {},
      jsonLayer: null,
      form: {
        search: "",
        mapa_id: "mapa",
        descripcion: "Mapa estandar de la ciudad de La Plata"
      }
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
    getFeature(lng, lat) {
      const glookup = new GeoJsonGeometriesLookup(this.geojsonFeature);
      const point = { type: "Point", coordinates: [lng, lat] };
      let containers = glookup.getContainers(point);
      if (containers.features.length) {
        let last_index = containers.features.length - 1;
        console.log(containers.features[last_index].properties.name);
        return containers.features[last_index];
      } else {
        return false;
      }
    },
    getInfo(lng, lat) {
      let info;
      let feature = this.getFeature(lng, lat);
      switch (this.form.mapa_id) {
        case "mapa_inundaciones_simple":
          feature
            ? (info = feature.properties.info)
            : (info = "Riesgo de inundacion: Poco Probable");
          break;
        case "mapa_altitud":
          feature
            ? (info = `Altura del terreno: ${feature.properties.altura} m`)
            : (info = "Zona fuera de rango");
          break;
        default:
          info = "Sin Comentarios";
          break;
      }
      return info;
    },
    setMarker(address, lng, lat) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      let informacion = this.getInfo(lng, lat);
      let detalle = getDetalle(address, informacion);
      this.marker = new L.marker([lat, lng]).addTo(this.map);
      this.marker.bindPopup(detalle).openPopup();
    },
    setLegend() {
      /* legend es una const global del script */
      legend.onAdd = map => {
        let div = L.DomUtil.create("div", "info legend"),
          grades = [0, 10, 20, 30],
          labels = [];
        switch (this.form.mapa_id) {
          case "mapa_inundaciones_simple":
            div.innerHTML += "<h5>Nivel de riesgo de inundacion:</h5>";
            div.innerHTML +=
              "<i style='background:blue'></i> Muy probable </br>";
            div.innerHTML +=
              "<i style='background: rgba(228, 225, 225, 0.8);'></i> Poco probable";
            break;
          case "mapa_altitud":
            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML += "<h5>Niveles de altitud:</h5>";
            for (var i = 0; i < grades.length; i++) {
              div.innerHTML +=
                '<i style="background:' +
                this.getColor(grades[i] + 1) +
                '"></i> ' +
                grades[i] +
                (grades[i + 1]
                  ? "&ndash;" + grades[i + 1] + " m" + "<br>"
                  : "+ m");
            }
            break;
          default:
            console.log("ola");
            break;
        }

        return div;
      };
      legend.addTo(this.map);
    },
    setMapFilter() {
      if (this.jsonLayer) {
        this.jsonLayer.clearLayers();
        this.map.removeLayer(this.jsonLayer);
        this.jsonLayer = null;
        this.geojsonFeature = null;
      }
      /* Seteo el geojsonFeature con el poligono correspondiente */
      const { mapa_id: id } = this.form;
      this.geojsonFeature = poligonos[id];
      /* Seteo la descripcion acorde al filtro seleccionado */
      switch (id) {
        case "mapa_inundaciones_simple":
          this.form.descripcion =
            "Mapa simple de zonas inundables segun los cursos de agua de la zona";
          break;
        case "mapa_altitud":
          this.form.descripcion =
            "Mapa de las altitudes del terreno segun la zona y nivel de riesgo de inundacion";
          break;
        default:
          this.form.descripcion = "Mapa estandar de la ciudad de La Plata";
          break;
      }
      this.setLegend();
      // console.log(this.geojsonFeature);

      this.jsonLayer = L.geoJSON(this.geojsonFeature, {
        style: this.style
      }).addTo(this.map);
    },
    async onMapClick(e) {
      let latlng = e.latlng;

      let address;
      await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`
      )
        .then(response => response.json())
        .then(data => {
          address = data.display_name;
        });
      this.setMarker(address, latlng.lng, latlng.lat);
    },
    async searchAddress(e) {
      if (e.key == "Enter") {
        const results = await provider.search({ query: this.form.search });
        // console.log(results); // results es un array
        const { x: lng, y: lat, label: address } = results[0];
        // console.log(results[0].raw);
        this.setMarker(address, lng, lat);
      }
    },
    getColor(d) {
      /*  return d > 1000
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
        : "#FFEDA0"; */
      return d > 30 ? "orange" : d > 20 ? "yellow" : d > 10 ? "green" : "blue";
    },
    style(feature) {
      let style = {
        stroke: false,
        // fillColor: "blue", default
        weight: 2,
        opacity: 1,
        color: "black",
        dashArray: "3",
        fillOpacity: 0.3
      };
      switch (this.form.mapa_id) {
        case "mapa_inundaciones_simple":
          style.fillColor = "blue";
        case "mapa_altitud":
          style.fillColor = this.getColor(feature.properties.altura);
        default:
          break;
      }
      return style;
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
  column-gap: 10px;
}

#barraBusqueda input {
  /* margin-right: 10px; */
}

#map-data-descriptor {
  background-color: rgb(255, 255, 255);
  min-width: min-content;
  padding: 0 1rem;
}
.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  /* background: white; */
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.info h5 {
  margin: 0 0 5px;
  color: rgb(0, 0, 0);
}
.legend {
  line-height: 18px;
  color: #555;
  text-align: left;
}
.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}
</style>
