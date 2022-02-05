<template>
  <div class="results-container">
    <!-- If there are results, show them -->
    <div v-if="isResults">
      <h2 class="heading">You might also like</h2>
      <ul
        v-for="movie in similarMovies"
        :key="movie.id"
        class="content-wrapper"
      >
        <li class="content" :title="movie.title" @click="sendMovieId(movie.id)">
          <div class="content__poster">
            <img
              v-if="movie.poster_path"
              :src="setPath(movie.poster_path)"
              alt=""
            />
            <img
              v-else
              src="../assets/no-poster-img.svg"
              width="70"
              height="35.3"
              alt=""
              class="no-poster-img"
            />
            <p class="tag">Movie</p>
          </div>
          <div class="content__info">
            <h3 class="content__info-title">
              {{ setTitleLength(movie.title) }}
            </h3>
            <div class="meta flex flex-jc-sb">
              <p v-if="movie.release_date" class="content__info-date">
                {{ setDate(movie.release_date) }}
              </p>
              <p v-else class="content__info-date">n/a</p>
              <p class="content__info-rating">
                <img
                  src="../assets/rating-icon.svg"
                  width="15"
                  height="14.4"
                  alt="star icon"
                />{{ roundRating(movie.vote_average) }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import apiKey from "../../config.js";
const imgPath = "https://image.tmdb.org/t/p/w500";

export default {
  props: ["movieId", "setDate"],
  emits: ["send-id"],
  inject: ["scrollToTop"],
  data() {
    return {
      similarMovies: [],
      isResults: false,
    };
  },
  methods: {
    setPath(poster_path) {
      return imgPath + poster_path;
    },
    setTitleLength(title) {
      if (title.length <= 20) {
        return title;
      }

      let shortTitle = "";
      for (let i = 0; i <= 20; i++) {
        shortTitle += title[i];
      }
      return shortTitle + "...";
    },
    async getMovies(id) {
      const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`;
      const alt_url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      // check if there are recommended movies
      if (data.results.length !== 0) {
        this.setDataLength(data.results);
      } else {
        // if there are no recommended movies, fetch data using alternate url
        const response = await fetch(alt_url);
        const data = await response.json();
        this.setDataLength(data.results);
      }
    },
    roundRating(rating) {
      return Math.round(rating * 10) / 10;
    },
    sendMovieId(id) {
      this.$emit("send-id", id);
    },
    setDataLength(data) {
      // only get the first 8 results
      if (data.length >= 8) {
        this.isResults = true;
        for (let i = 0; i < 8; i++) {
          this.similarMovies.push(data[i]);
        }
      } else if (data.length > 0 && data.length < 8) {
        this.isResults = true;
        for (let i = 0; i < data.length; i++) {
          this.similarMovies.push(data[i]);
        }
      }
    },
  },
  watch: {
    movieId(newValue) {
      // call the getMovies() method to fetch movies when the movieId prop has a value
      if (newValue) {
        this.scrollToTop();
        // perform resets before a new fetch request
        this.similarMovies = [];
        this.isResults = false;
        this.getMovies(newValue);
      } else {
        // perform resets if there was a previous value for the movieId prop
        this.similarMovies = [];
      }
    },
  },
};
</script>

<style scoped>
.heading {
  margin-bottom: 2.1875rem;
  font-size: var(--font-size-28);
  font-weight: 400;
  color: var(--color-clouds);
}
</style>