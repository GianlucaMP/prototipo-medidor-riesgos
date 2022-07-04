var test = {
  casco: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        id: "01",
        properties: { name: "La Plata", density: 94.65 },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-57.95413, -34.887269],
              [-57.913161, -34.917608],
              [-57.952526, -34.953836],
              [-57.993919, -34.923106]
            ]
          ]
        }
      }
    ]
  }
};

var poligonos = {};

poligonos.mapa_base = require("./LaPlata0.json");
poligonos.mapa_inundaciones = require("./LaPlata1.json");
// poligonos.mapa_altitud = require("./LaPlata2.json");
poligonos.mapa_inundaciones_simple = require("./LaPlataInundacionesSimple.json");

export default poligonos;
