<template>
  <div id="app">
    <nav>
      <div class="rmm">
        <ul>
          <li>
            <router-link to="/">Inicio</router-link>
          </li>
          <li>
            <router-link to="/mapa">Mapa</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- <img src="./assets/logo.png" /> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
