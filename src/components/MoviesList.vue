<template>
  <div class="results-container wrapper">
    <div>
      <ul
        v-for="result in searchResults"
        :key="result.id"
        class="content-wrapper"
      >
        <li
          class="content hover"
          :title="result.title"
          @click="sendMovieId(result.id)"
        >
          <div class="content__poster">
            <img
              v-if="result.poster_path"
              :src="setPath(result.poster_path)"
              :alt="`poster image for ${result.title}`"
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
              v-if="result.poster_path"
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
          <!-- movie info card -->
          <div v-if="isShowInfo" class="hover__info">
            <h2 class="hover__info-title">{{ result.title }}</h2>
            <span class="grey-bg"></span>
            <p v-if="result.overview" class="hover__info-overview">
              {{ setOverviewLength(result.overview) }}
            </p>
            <p v-else class="hover__info-overview">n/a</p>

            <div class="meta__info">
              <div class="meta__info-rating flex">
                <p class="description">Rating:</p>
                <p class="data">{{ result.vote_average }} / 10</p>
              </div>
              <div class="meta__info-release flex">
                <p class="description">Release:</p>
                <p v-if="result.release_date" class="data">
                  {{ setDate(result.release_date) }}
                </p>
                <p v-else class="data">n/a</p>
              </div>
            </div>
            <button :title="result.title">View More Info</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import apiKey from "../../config.js";

export default {
  name: "MoviesList",
  props: ["pageNum"],
  emits: ["set-status", "total-pages", "send-id"],
  inject: ["setPath", "setTitleLength", "setDate", "setOverviewLength"],
  data() {
    return {
      searchResults: [],
      componentName: "MoviesList",
      isShowInfo: false,
    };
  },
  methods: {
    async getMovies(page) {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
      // set loading status to true
      this.$emit("set-status", true);
      // perform resets before a new fetch request
      this.searchResults = [];

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      this.removePlaceholder();

      // only get the first 40 pages
      if (data.total_pages > 40) {
        this.totalPages = 40;
      } else {
        this.totalPages = data.total_pages;
      }
      this.searchResults = data.results;
      this.$emit(
        "total-pages",
        this.totalPages,
        this.pageNum,
        this.componentName
      );
    },
    removePlaceholder() {
      this.isResults = true;
      this.$emit("set-status", false);
    },
    sendMovieId(id) {
      this.$emit("send-id", id);
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
          // than the viewport width, then set the appropriate position for the info card
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
    pageNum(newValue) {
      // call the getMovies() method to fetch movies when switching pages
      this.getMovies(newValue);
    },
  },
  beforeMount() {
    // call the getMovies() method
    this.getMovies(this.pageNum);
  },
  updated() {
    // call these methods when the page is updated
    this.setInfoCardPosition();
    this.checkWindowSize();
  },
};
</script>