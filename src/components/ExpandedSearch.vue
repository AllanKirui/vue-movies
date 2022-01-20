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
            <p class="content__info-date">{{ result.release_date }}</p>
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

.results-container {
  width: 100%;
  padding-right: 0.9375rem;
  padding-left: 0.9375rem;
  margin-right: auto;
  margin-left: auto;
}

.content-wrapper .content {
  width: 23.5%;
  height: 29.6875rem;
  margin: 0 0.4%;
  float: left;
  display: block;
  position: relative;
  cursor: pointer;
}

.content__poster {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  overflow: hidden;
}

.content__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content .tag {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0.125rem 0.5rem;
  border-radius: 0 10px 0 0;
  background-color: var(--color-smokey-black);
  color: var(--color-white);
}

.content__info-title {
  margin-bottom: 0.4375rem;
  font-size: var(--font-size-20);
  color: var(--color-white);
}

.content__info .meta {
  font-size: var(--font-size-18);
  color: var(--color-clouds);
}

.content__info img {
  margin-right: 0.1875rem;
}

@media screen and (max-width: 1439px) {
  .content-wrapper {
    margin: 0 -0.5%;
  }

  .content-wrapper .content {
    width: 19%;
    margin: 0 0.5%;
  }
}

@media screen and (max-width: 1279px) {
  .content-wrapper {
    margin: 0 -0.5%;
  }

  .content-wrapper .content {
    width: 19%;
    height: 26.875rem;
    margin: 0 0.5%;
  }

  .content__info-title {
    font-size: var(--font-size-18);
  }

  .content__info .meta {
    font-size: var(--font-size-16);
  }
}

@media screen and (max-width: 1139px) {
  .content-wrapper .content {
    height: 24.375rem;
  }
}

@media screen and (max-width: 1023px) {
  .content-wrapper .content {
    height: 22.5rem;
    margin-bottom: 0px !important;
  }
}

@media screen and (max-width: 768px) {
  .content-wrapper {
    margin: 0 -0.75%;
  }

  .content-wrapper .content {
    width: 31.3333333333%;
    margin: 0 0.75%;
    margin-bottom: 4.375rem !important;
  }
}

@media screen and (max-width: 719px) {
  .content-wrapper .content {
    margin-bottom: 2.5rem !important;
  }
}

@media screen and (max-width: 576px) {
  .content-wrapper {
    margin: 0 -1%;
  }

  .content-wrapper .content {
    width: 47%;
    margin: 0 1%;
    margin-bottom: 6.25rem !important;
  }
}

@media screen and (max-width: 519px) {
  .content-wrapper .content {
    margin-bottom: 3.4375rem !important;
  }
}

@media screen and (max-width: 480px) {
  .content-wrapper {
    margin: 0 -1.5%;
  }

  .content-wrapper .content {
    width: 47%;
    margin: 0 1.5%;
    margin-bottom: 1.875rem !important;
  }
}

@media screen and (max-width: 419px) {
  .content-wrapper .content {
    margin-bottom: 0.625rem !important;
  }
}
</style>