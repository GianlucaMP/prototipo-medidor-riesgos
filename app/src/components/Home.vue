<template>
  <div class="home">
    <h1>BIENVENIDO A LA PÁGINA DE MEDICION DE RIESGOS</h1>
    <h4>
      Aquí podrás buscar informacion relevante sobre los lugares seguros para
      construir o adquirir un terreno
    </h4>
    <ul class="home-list">
      <li>
        <router-link to="/">
          <h5>Inicio</h5>
          <p class="white">
            Es la seccion que estas viendo ahora mismo, explica el proposito del
            sitio
          </p>
        </router-link>
      </li>

      <li>
        <router-link to="/mapa">
          <h5>Mapa</h5>
          <p class="white">
            Seccion con un mapa interactivo donde podras seleccionar direcciones
            y ver las recomendaciones correspondientes por altitudes o
            inundabilidad
          </p>
        </router-link>
      </li>
      <li>
        <router-link to="/recomendaciones">
          <h5>Recomendaciones</h5>
          <p class="white">
            Seccion donde podras leer en mayor detalle las recomendaciones
            brindadas por el mapa
          </p>
        </router-link>
      </li>
      <li>
        <router-link to="/ayuda">
          <h5>Ayuda</h5>
          <p class="white">
            Seccion destinada a las preguntas frecuentes y explicar en detalle
            como usar las funcionalidades del sitio
          </p>
        </router-link>
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
.white {
  color: white;
}

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

a,
a:hover {
  text-decoration: none;
}

@media (max-width: 900px) {
  .home {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .home-list {
    flex-grow: 1;
    flex-direction: column;
    padding-left: 0%;
    margin-bottom: 0%;
    -webkit-align-items: center;
    min-height: 600px;
    /* background-color: aqua; */
  }

  .home-list li {
    /* max-width: 80%; */
    min-width: 80%;
    /* margin: auto auto; */
  }
}
</style>
