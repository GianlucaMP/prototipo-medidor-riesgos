<template>
  <div class="ayuda">
    <h1>Seccion de ayuda y preguntas frecuentes</h1>
    <h4>
      Aqui podras obtener informacion en detalle sobre las secciones del sitio y
      como usar las distintas funcionalidades en ellas disponibles
    </h4>
    <ul>
      <li>
        <h5>Como uso el mapa?</h5>
        <p>
          Sencillo, selecciona el filtro de altitud o inundabilidad segun tu
          interes, ingresas una direccion en el buscador de direcciones, le das
          a enter y listo, un marcador aparecera en el mapa. Tambien podes hacer
          que el marcador aparezca directamente haciendo click sobre el lugar de
          tu interes en el mapa.
        </p>
      </li>
      <li>
        <h5>Como ingreso una direccion?</h5>
        <p>
          Si deseas usar la entrada de texto para buscar la direccion, es
          recomendable usar el formato (numero, calle, ciudad). Tambien podes
          navegar en el mapa interactivo y marcar el lugar haciendo click
        </p>
      </li>
      <li>
        <h5>Que dice en el detalle de cada marcador?</h5>
        <p>
          Dice la direccion del lugar marcado, el nivel de inundabilidad o
          altura segun que filtro se haya selecicnado. En ambos casos hay un
          enlace <a href="#">Ver Mas...</a> que te redirige al detalle de la
          recomendacion de seguridad para la construccion en el lugar
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Ayuda"
};
</script>

<style>
.ayuda {
  text-align: left;
  margin-left: 30px;
  padding-left: 0; /* Bootstrap por defecto te pone padding de 40px */
}
ul {
  list-style: none;
}
</style>
