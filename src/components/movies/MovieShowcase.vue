<template>
  <div class="showcase-wrapper">
    <h1>Movie Showcase</h1>
  </div>
</template>

<script>
import apiKey from "../../../config.js";

export default {
  name: "MovieShowcase",
  data() {
    return {
      isLoading: false,
      results: [],
    };
  },
  methods: {
    async getMovies() {
      this.isLoading = true;
      const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`;

      // perform resets before a new fetch request
      this.searchResults = [];

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      this.isLoading = false;
      this.checkResults(data.results);
    },
    checkResults(results) {
      // only get the first 8 movies
      if (results.length > 8) {
        for (let i = 0; i < 8; i++) {
          this.results.push(results[i]);
        }
      } else {
        this.results.push(results);
      }
    },
  },
  beforeMount() {
    this.getMovies();
  },
};
</script>