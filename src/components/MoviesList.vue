<template>
  <div class="results-container">
    <!-- <div v-if="isResults"> -->
    <div>
      <ul
        v-for="result in searchResults"
        :key="result.id"
        class="content-wrapper"
      >
        <li
          class="content"
          :title="result.title"
          @click="sendMovieId(result.id)"
        >
          <div class="content__poster">
            <img
              v-if="result.poster_path"
              :src="setPath(result.poster_path)"
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
              {{ setTitleLength(result.title) }}
            </h3>
            <div class="meta flex flex-jc-sb">
              <p v-if="result.release_date" class="content__info-date">
                {{ setDate(result.release_date) }}
              </p>
              <p v-else class="content__info-date">n/a</p>
              <p class="content__info-rating">
                <img
                  src="../assets/rating-icon.svg"
                  width="15"
                  height="14.4"
                  alt="star icon"
                />{{ result.vote_average }}
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
  props: ["setDate", "pageNum"],
  data() {
    return {
      searchResults: [],
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
    async getMovies(page) {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

      // perform resets before a new fetch request
      this.searchResults = [];

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      this.searchResults = data.results;
    },
  },
  beforeMount() {
    // call the getMovies() method
    this.getMovies(this.pageNum);
  },
};
</script>