<template>
  <div class="search-container">
    <!-- <form class="search-form" @submit.prevent="getMovies(searchLink)"> -->
    <form class="search-form" @submit.prevent="getMovies(searchLink)">
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
    <h1 v-if="userInput" class="search-term">
      Showing results for: <span class="text-white">{{ userInput }}</span>
    </h1>
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
          <p class="tag">Movie</p>
        </div>
        <div class="content__info">
          <h3 class="content__info-title">
            {{ setTitleLength(result.title) }}
          </h3>
          <div class="meta flex flex-jc-sb">
            <p class="content__info-date">{{ setDate(result.release_date) }}</p>
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
</template>

<script>
import apiKey from "../../config.js";
const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query="`;
const imgPath = "https://image.tmdb.org/t/p/w1280";

export default {
  props: ["setDate"],
  data() {
    return {
      searchTerm: "",
      userInput: "",
      searchLink: searchAPI,
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
    async getMovies(url) {
      // this.isSearchActive = true;
      // this.isLoading = true;
      this.userInput = this.searchTerm;

      // perform resets before a new fetch request
      this.searchResults = [];
      this.searchTerm = "";
      // this.searchTerm = "";
      // this.searchResults.push(this.isSearchActive);
      // this.isMoreResults = false;

      // if (this.searchTerm === "") {
      //   this.isLoading = false;
      //   // show no results, change routes
      //   window.location.reload();
      //   return;
      // }

      const response = await fetch(url + this.userInput);
      const data = await response.json();
      // this.isLoading = false;
      // this.checkResults(data.results);
      // console.log(data.results);
      this.searchResults = data.results;
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
</style>