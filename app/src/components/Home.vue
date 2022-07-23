<template>
  <div class="home">
    <h1>BIENVENIDO A LA PÁGINA DE MEDICION DE RIESGOS</h1>
    <h4>
      Aquí podrás buscar informacion relevante sobre los lugares seguros para
      construir o adquirir un terreno
    </h4>
    <ul class="home-list">
      <li>
        <h5>Inicio</h5>
        <p>
          Es la seccion que estas viendo ahora mismo, explica el proposito del
          sitio
        </p>
      </li>
      <li>
        <h5>Mapa</h5>
        <p>
          Seccion con un mapa interactivo donde podras seleccionar direcciones y
          ver las recomendaciones correspondientes por altitudes o inundabilidad
        </p>
      </li>
      <li>
        <h5>Recomendaciones</h5>
        <p>
          Seccion donde podras leer en mayor detalle las recomendaciones
          brindadas por el mapa
        </p>
      </li>
      <li>
        <h5>Ayuda</h5>
        <p>
          Seccion destinada a las preguntas frecuentes y explicar en detalle
          como usar las funcionalidades del sitio
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "Home"
    };
  }
};
</script>

<style>
.home-list {
  display: flex;
  justify-content: space-around;
  column-count: 4;
  list-style: none;
  text-align: left;
}

.home-list li {
  max-width: 20%;
  background-color: #353b41bd; /* color del sitio #343a40 */
  padding: 10px;
  border-radius: 10px;
  color: #000000;
}

.home-list h5 {
  color: #ffffff;
}

h1 {
  margin-top: 10px;
}
</style>
