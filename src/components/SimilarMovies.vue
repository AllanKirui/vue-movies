<template>
  <div class="results-container">
    <!-- If there are results, show them -->
    <div v-if="isResults">
      <ul
        v-for="movie in similarMovies"
        :key="movie.id"
        class="content-wrapper"
      >
        <li class="content" :title="movie.title">
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

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      // only get the first 8 results
      if (data.results.length >= 8) {
        this.isResults = true;
        for (let i = 0; i < 8; i++) {
          this.similarMovies.push(data.results[i]);
        }
      } else {
        this.similarMovies.push(data.results);
      }
    },
    roundRating(rating) {
      return Math.round(rating * 10) / 10;
    },
  },
  watch: {
    movieId(newValue) {
      // call the getMovies() method to fetch movies when the movieId prop has a value
      if (newValue) {
        this.similarMovies = []; // perform resets before a new fetch request
        this.getMovies(newValue);
      } else {
        // perform resets if there was a previous value for the movieId prop
        this.similarMovies = [];
      }
    },
  },
};
</script>