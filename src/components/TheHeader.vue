<template>
  <nav class="flex flex-jc-sb">
    <div class="nav-left flex flex-ai-c">
      <button
        :class="[isMenuOpen ? 'open' : '', 'burger']"
        @click="setActiveStatus"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="logo">
        <img src="../assets/logo.svg" width="191" height="71" />
      </div>

      <ul class="nav-options flex">
        <li><a href="#">Movies</a></li>
        <li><a href="#">TV Shows</a></li>
      </ul>
    </div>

    <!-- show this conditionally -->
    <div v-if="!isHidden" class="nav-right flex flex-ai-c">
      <form class="search-form" @submit.prevent="getMovies(searchLink)">
        <label for="search">Search</label>
        <input
          name="search"
          type="text"
          placeholder="Search for movies or TV shows..."
          v-model.trim="searchTerm"
          :class="searchTerm ? 'active-search' : ''"
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

    <!-- call teh class button wrapper and have it use the same styles as the view more button -->
    <div v-else class="button-wrapper">
      <button @click="removeSearchResults" title="Close Search">
        Close Search
      </button>
    </div>

    <search-handler
      v-if="!isLoading && isSearchActive"
      :search-results="searchResults"
      @emit-searchterm="sendSearchTerm"
    ></search-handler>
    <search-placeholder v-else-if="isLoading"></search-placeholder>
  </nav>

  <teleport to="body">
    <div
      :class="[isSearchActive ? 'active-overlay' : '', 'overlay']"
      @click="removeOverlay"
    ></div>
  </teleport>
</template>

<script>
import apiKey from "../../config.js";
import SearchHandler from "./SearchHandler.vue";
import SearchPlaceholder from "./SearchPlaceholder.vue";
const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query="`;

export default {
  components: {
    "search-handler": SearchHandler,
    "search-placeholder": SearchPlaceholder,
  },
  emits: ["no-scroll", "find-searchterm", "remove-results"],
  data() {
    return {
      isMenuOpen: false,
      searchTerm: "",
      searchLink: searchAPI,
      isSearchActive: false,
      searchResults: [],
      isMoreResults: false,
      isLoading: false,
      isHidden: false,
    };
  },
  methods: {
    setActiveStatus() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async getMovies(url) {
      this.isSearchActive = true;
      this.isLoading = true;
      // perform resets before a new fetch request
      this.searchResults = [];
      this.searchResults.push(this.isSearchActive);
      this.isMoreResults = false;

      if (this.searchTerm === "") {
        this.isLoading = false;
        // show no results, change routes
        window.location.reload();
        return;
      }

      const response = await fetch(url + this.searchTerm);
      const data = await response.json();
      this.isLoading = false;
      this.checkResults(data.results);
    },
    checkResults(results) {
      // check if search results are more or less than five
      if (results.length <= 5) {
        this.searchResults.push(results, this.isMoreResults);
      } else {
        this.isMoreResults = !this.isMoreResults;
        // show a maximum of 8 results in the search box
        const minResults = [];
        for (let i = 0; i < 8; i++) {
          minResults.push(results[i]);
        }
        this.searchResults.push(minResults, this.isMoreResults);
      }
    },
    removeOverlay() {
      this.isSearchActive = !this.isSearchActive;
      this.searchResults[0] = false;
      this.searchTerm = "";
    },
    sendSearchTerm() {
      this.$emit("find-searchterm", this.searchTerm);
      // hide the mini-search, SearchHandler component
      this.isHidden = true;
      this.removeOverlay();
    },
    removeSearchResults() {
      this.isHidden = false;
      this.$emit("remove-results");
    },
  },
  watch: {
    isSearchActive(newValue) {
      if (newValue) {
        this.$emit("no-scroll", true);
      } else {
        this.$emit("no-scroll", false);
      }
    },
  },
};
</script>

<style>
nav {
  width: 100%;
  height: 5rem;
  padding: 0 0.9375rem;
  background-color: var(--color-jet-black);
  position: relative;
}

.burger {
  background-color: transparent;
  width: 24px;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 2;
  margin-right: 30px;
}

.burger span {
  display: block;
  position: relative;
  top: 0;
  width: 24px;
  height: 3px;
  background-color: var(--color-clouds);
  margin-bottom: 5px;
  transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width,
    0.3s ease right;
  border-radius: 2px;
}

.burger span:first-child {
  transform-origin: 0;
}

.burger span:last-child {
  margin-bottom: 0;
  transform-origin: 24px;
}

.burger.open span:first-child {
  top: -2px;
  transform: rotateZ(45deg);
}

.burger.open span:last-child {
  top: 6px;
  transform: rotateZ(45deg);
}

.burger.open span:nth-child(2) {
  width: 38px;
  top: 2px;
  right: 7px;
  transform: rotateZ(-45deg);
}

.nav-options {
  list-style: none;
  padding: 0;
}

.nav-options a {
  font-size: var(--font-size-18);
  font-weight: bold;
  color: var(--color-clouds);
}

.nav-options li:not(:last-child),
.logo {
  margin-right: 2.5rem;
}

.search-form {
  position: relative;
}

.search-form label {
  display: none;
}

.search-form input {
  width: 25rem;
  max-width: 100%;
  padding: 0.875rem 3.4375rem 0.875rem 1.375rem;
  border-radius: 50px;
  outline: none;
  border: 1px solid var(--color-clouds);
  background: var(--color-jet-black);
  font-family: "PT Sans", sans-serif;
  font-size: var(--font-size-16);
}

.search-form input,
.search-form input::placeholder {
  color: var(--color-clouds);
}

.search-form input.active-search,
.search-form input:focus {
  background-color: var(--color-clouds);
  color: var(--color-jet-black);
}

.search-btn {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
}

.search-btn svg circle,
.search-btn svg path {
  stroke: var(--color-clouds) !important;
  transition: stroke 0.2s ease-in-out;
}

.search-form input:focus + .search-btn svg circle,
.search-form input:focus + .search-btn svg path,
.search-form input.active-search + .search-btn svg circle,
.search-form input.active-search + .search-btn svg path {
  stroke: var(--color-jet-black) !important;
}

.button-wrapper {
  margin: auto 0;
}

.button-wrapper button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-clouds);
  color: var(--color-smokey-black);
  font-family: inherit;
  font-size: var(--font-size-16);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.button-wrapper button:hover {
  outline: var(--color-clouds) 1px solid;
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
}

/* styling for registered components */
.results-wrapper,
.placeholder-wrapper {
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  max-width: 33.125rem;
  height: 29.375rem;
  padding: 0.8125rem 0.625rem;
  background-color: var(--color-jet-black);
  opacity: 0.95;
  visibility: hidden;
  z-index: 2;
}

.results-wrapper {
  overflow-y: auto;
}

.placeholder-wrapper,
.results-wrapper.active {
  visibility: visible;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result {
  padding: 0.625rem 0.8125rem;
  background-color: var(--color-smokey-black);
  border-radius: 8px;
  margin-bottom: 0.8125rem;
  position: relative;
}

.result__poster {
  width: 5.625rem;
  height: 7.5rem;
  margin-right: 0.625rem;
  background-color: var(--color-jet-black);
}
</style>