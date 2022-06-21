<template>
  <div class="---">
    <h1>Recomendaciones</h1>
    <div class="row">
      <div class="column">
        <img v-bind:src="require('../assets/proxy.jpg')" />
        <h4>Recomendación 1</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div class="column">
        <img v-bind:src="require('../assets/proxy.jpg')" />
        <h4>Recomendación 2</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div class="column">
        <img v-bind:src="require('../assets/proxy.jpg')" />
        <h4>Recomendación 3</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
    </div>
    <div class="m-3">
        <router-link class="btn btn-light" to="/">Volver</router-link>
      </div>
  </div>
</template>

<script>

export default {
  name: "Recomendaciones",
  data() {
    return {
      msg: "Recomendaciones"
    };
  }
};
</script>
