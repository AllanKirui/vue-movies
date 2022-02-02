<template>
  <div v-if="result" class="info-wrapper">
    <div class="content-poster">
      <img :src="setPath(result.poster_path)" alt="" width="320" />
    </div>
    <div class="content-text">
      <h1 class="content-title">{{ result.title }}</h1>

      <div class="meta">
        <div class="meta-section-1">
          <p class="content-rating">{{ result.rating }}</p>
          <p class="content-runtime">{{ result.runtime }}</p>
        </div>

        <div class="meta-section-2">
          <p class="content-overview">{{ result.overview }}</p>
        </div>

        <div class="meta-section-3">
          <div class="content-country flex">
            <p>Country</p>
            <div
              v-for="country in result.production_countries"
              :key="country.name"
            >
              <p>{{ country.name }}</p>
            </div>
          </div>
          <div class="content-genre flex">
            <p>Genre</p>
            <div v-for="genre in result.genres" :key="genre.id">
              <p>
                {{ genre.name }}
              </p>
            </div>
          </div>
          <div class="content-release flex">
            <p>Release</p>
            <p>{{ setDate(result.release_date) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiKey from "../../config.js";
const imgPath = "https://image.tmdb.org/t/p/w1280";

export default {
  props: ["movieId", "setDate"],
  data() {
    return {
      result: null,
    };
  },
  methods: {
    setPath(poster_path) {
      return imgPath + poster_path;
    },
    async getMovies(id) {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      this.result = data;
      console.log(this.result);
    },
  },
  watch: {
    movieId(newValue) {
      if (newValue) {
        this.getMovies(newValue);
      }
    },
  },
};
</script>