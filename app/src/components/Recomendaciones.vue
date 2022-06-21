<template>
  <div class="---">
    <h1>Recomendaciones</h1>
    <div class="row">
      <div class="column">
        <img v-bind:src="require('../assets/proxy.jpg')" />
        <h4>Recomendación 1</h4>
        <p>Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación -</p>
      </div>
      <div class="column">
        <img v-bind:src="require('../assets/proxy.jpg')" />
        <h4>Recomendación 2</h4>
        <p>Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación -</p>
      </div>
      <div class="column">
        <img v-bind:src="require('../assets/proxy.jpg')" />
        <h4>Recomendación 3</h4>
        <p>Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación - Recomendación -</p>
      </div>
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
