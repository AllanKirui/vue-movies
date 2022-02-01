<template>
  <div class="info-wrapper"></div>
</template>

<script>
import apiKey from "../../config.js";

export default {
  props: ["movieId"],
  data() {
    return {
      result: null,
    };
  },
  methods: {
    async getMovies(id) {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      this.result = data;
    },
  },
};
</script>