<template>
  <div class="results-container">
    <!-- If there are results, show them -->
    <div v-if="isResults && isLoaded" class="results">
      <h2 class="heading">You might also like</h2>
      <ul
        v-for="movie in similarMovies"
        :key="movie.id"
        class="content-wrapper"
      >
        <li
          class="content hover"
          @click="sendMovieId(movie.id)"
          :title="movie.title"
        >
          <div class="content__poster">
            <img
              v-if="movie.poster_path"
              :src="setPath(movie.poster_path)"
              :alt="`poster image for ${movie.title}`"
              class="poster-img"
            />
            <img
              v-else
              src="../assets/no-poster-img.svg"
              width="70"
              height="35.3"
              alt="no poster image"
              class="no-poster-img"
            />
            <!-- show a placeholder image before the poster loads -->
            <img
              v-if="movie.poster_path"
              src="../assets/poster-placeholder.png"
              width="70"
              height="35.3"
              alt="placeholder image"
              class="placeholder-img"
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
          <!-- movie info card -->
          <div v-if="isShowInfo" class="hover__info">
            <h2 class="hover__info-title">{{ movie.title }}</h2>
            <span class="grey-bg"></span>
            <p v-if="movie.overview" class="hover__info-overview">
              {{ setOverviewLength(movie.overview) }}
            </p>
            <p v-else class="hover__info-overview">n/a</p>

            <div class="meta__info">
              <div class="meta__info-rating flex">
                <p class="description">Rating:</p>
                <p class="data">{{ roundRating(movie.vote_average) }} / 10</p>
              </div>
              <div class="meta__info-release flex">
                <p class="description">Release:</p>
                <p v-if="movie.release_date" class="data">
                  {{ setDate(movie.release_date) }}
                </p>
                <p v-else class="data">n/a</p>
              </div>
            </div>
            <button :title="movie.title">View More Info</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import apiKey from "../../config.js";

export default {
  name: "SimilarMovies",
  props: ["movieId", "setDate", "isLoaded"],
  emits: ["send-id"],
  inject: ["scrollToTop", "setOverviewLength", "setPath", "setTitleLength"],
  data() {
    return {
      similarMovies: [],
      isResults: false,
      isShowInfo: false,
    };
  },
  methods: {
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
    setInfoCardPosition() {
      let viewportWidth = window.innerWidth;
      // only show hover information for screens 768px and above
      if (viewportWidth >= 1024) {
        this.isShowInfo = true;
        const movieItems = document.querySelectorAll(".hover__info");
        movieItems.forEach((movie) => {
          // find the distance to the right of each movie card
          let distToRight = movie.getBoundingClientRect().right;

          // add an extra 250px to the distance, to make sure that it will be more
          // than the viewport width, then set the appropriate postiion for the info card
          if (
            distToRight > viewportWidth ||
            distToRight + 250 > viewportWidth
          ) {
            movie.style.right = "95%";
          } else {
            movie.style.right = "-110%";
          }
        });
      } else {
        this.isShowInfo = false;
      }
    },
    checkWindowSize() {
      // listen to the resize event and call the method to set the info card's position
      window.addEventListener("resize", this.setInfoCardPosition);
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
  updated() {
    // call these methods when the page is updated
    this.setInfoCardPosition();
    this.checkWindowSize();
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