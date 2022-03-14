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
          :title="result.name"
          @click="sendShowId(result.id)"
        >
          <div class="content__poster">
            <img
              v-if="result.poster_path"
              :src="setPath(result.poster_path)"
              :alt="`poster image for ${result.name}`"
              class="poster-img"
            />
            <img
              v-else
              src="../../assets/no-poster-img.svg"
              width="70"
              height="35.3"
              alt="no poster image"
              class="no-poster-img"
            />
            <!-- show a placeholder image before the poster loads -->
            <img
              v-if="result.poster_path"
              src="../../assets/poster-placeholder.png"
              width="70"
              height="35.3"
              alt="placeholder image"
              class="placeholder-img"
            />
            <p class="tag">TV Show</p>
          </div>
          <div class="content__info">
            <h3 class="content__info-title">
              {{ setTitleLength(result.name) }}
            </h3>
            <div class="meta flex flex-jc-sb">
              <p v-if="result.first_air_date" class="content__info-date">
                {{ setDate(result.first_air_date) }}
              </p>
              <p v-else class="content__info-date">n/a</p>
              <p class="content__info-rating">
                <img
                  src="../../assets/rating-icon.svg"
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
import apiKey from "../../../config.js";

export default {
  name: "ShowsList",
  props: ["pageNum"],
  emits: ["set-status", "total-pages", "send-id"],
  inject: ["setPath", "setTitleLength", "setDate"],
  data() {
    return {
      searchResults: [],
      componentName: "ShowsList",
    };
  },
  methods: {
    async getShows(page) {
      const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}`;
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
    sendShowId(id) {
      this.$emit("send-id", id);
    },
  },
  watch: {
    pageNum(newValue) {
      // call the getShows() method to fetch shows when switching pages
      this.getShows(newValue);
    },
  },
  beforeMount() {
    // call the getShows() method
    this.getShows(this.pageNum);
  },
};
</script>