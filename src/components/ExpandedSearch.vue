<template>
  <div class="search-container">
    <form
      class="search-form"
      @submit.prevent="getMovies(searchLink, this.defaultPage)"
    >
      <label for="search">Search</label>
      <input
        name="search"
        type="text"
        placeholder="Search for movies or TV shows..."
        v-model.trim="searchTerm"
      />
      <button title="search" class="search-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 5.5562499 5.5562502"
        >
          <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1">
            <g
              id="g2499"
              transform="matrix(0.99256808,0,0,0.99256808,-633.03941,-286.23689)"
              style="display: inline; stroke: #090909; stroke-opacity: 1"
            >
              <circle
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #090909;
                  stroke-width: 0.40755;
                  stroke-opacity: 1;
                "
                id="circle2495"
                cx="640.03369"
                cy="290.65128"
                r="2.0451832"
              />
              <path
                style="
                  fill: none;
                  stroke: #090909;
                  stroke-width: 0.396875;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-opacity: 1;
                "
                d="m 641.51906,292.13667 1.72321,1.7232"
                id="path2497"
              />
            </g>
          </g>
        </svg>
      </button>
    </form>
  </div>

  <div class="results-container">
    <h1 v-if="queryParam" class="search-term">
      Showing results for: <span class="text-white">{{ searchTerm }}</span>
    </h1>
    <div v-if="isResults">
      <ul
        v-for="result in searchResults"
        :key="result.id"
        class="content-wrapper"
      >
        <li class="content" :title="result.title">
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
const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;
const imgPath = "https://image.tmdb.org/t/p/w1280";

export default {
  props: ["setDate", "page-num"],
  emits: ["set-status", "total-pages"],
  data() {
    return {
      searchTerm: "",
      userInput: "",
      queryParam: "", // to hold the page to fetch and the query
      searchLink: searchAPI,
      searchResults: [],
      isResults: false,
      totalPages: null,
      defaultPage: 1,
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
    async getMovies(url, page) {
      this.$emit("set-status", true);
      // this.isSearchActive = true;
      // this.isLoading = true;
      this.userInput = this.searchTerm;

      this.queryParam = `&page=${page}&query="${this.searchTerm}`;

      // perform resets before a new fetch request
      this.searchResults = [];
      // this.searchTerm = "";
      // this.searchTerm = "";
      // this.searchResults.push(this.isSearchActive);
      // this.isMoreResults = false;

      // if (this.searchTerm === "") {
      //   this.isLoading = false;
      //   // show no results, change routes
      //   window.location.reload();
      //   return;
      // }

      const response = await fetch(url + this.queryParam);
      const data = await response.json();
      this.removePlaceholder();
      this.totalPages = data.total_pages;
      this.searchResults = data.results;
      this.$emit("total-pages", this.totalPages);
    },
    removePlaceholder() {
      this.isResults = true;
      this.$emit("set-status", false);
    },
  },
  watch: {
    pageNum(newValue) {
      // call the getMovies() method to fetch movies when switching pages
      this.getMovies(this.searchLink, newValue);
    },
  },
};
</script>

<style scoped>
.search-container {
  margin-top: 2.1875rem;
  padding: 0 0.9375rem;
}

.search-form input {
  width: 100%;
}

.results-container {
  margin: 2.5rem 0;
}

.search-term {
  color: var(--color-spanish-gray);
  margin-bottom: 2.5rem;
}

.search-term .text-white {
  margin-left: 0.3125rem;
}

.content__poster img.no-poster-img {
  padding: 50% 0;
  object-fit: contain;
}

@media screen and (max-width: 768px) {
  .results-container {
    margin-top: 1rem;
  }

  .search-term {
    font-size: var(--font-size-24);
    margin-bottom: 1rem;
  }
}
</style>