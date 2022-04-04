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
        <router-link :to="moviesRoute" title="Home">
          <img
            src="../../assets/logo.svg"
            width="170"
            height="57"
            alt="vue movies logo"
            class="logo-img"
          />
          <h2 class="logo-text">Vue Movies</h2>
        </router-link>
      </div>

      <ul class="nav-options flex">
        <li
          @click="setActiveSide('movies')"
          :class="activeSide === 'movies' ? 'active-side' : ''"
          title="Go to Movies"
        >
          <router-link :to="moviesRoute" @click="removeExpandedSearchResults"
            >Movies</router-link
          >
        </li>
        <li
          @click="setActiveSide('shows')"
          :class="activeSide === 'shows' ? 'active-side' : ''"
          title="Go to Shows"
        >
          <router-link :to="showsRoute" @click="removeExpandedSearchResults"
            >TV Shows</router-link
          >
        </li>
      </ul>
    </div>

    <!-- show this conditionally -->
    <div v-if="!isHidden" class="nav-right flex flex-ai-c">
      <!-- conditionally get movies or tv shows based on the active side of the site -->
      <form
        class="search-form nav"
        @submit.prevent="
          activeSide === 'movies'
            ? getMovies(movieSearchLink)
            : getShows(tvSearchLink)
        "
      >
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

    <!-- show the close button -->
    <div v-else class="button-wrapper">
      <!-- go to the first page for movies -->
      <router-link
        v-if="activeSide === 'movies'"
        :to="moviesRoute"
        @click="removeExpandedSearchResults"
        title="Close Search"
      >
        Close Search
      </router-link>
      <!-- go to the first page for tv shows -->
      <router-link
        v-else
        :to="showsRoute"
        @click="removeExpandedSearchResults"
        title="Close Search"
      >
        Close Search
      </router-link>
    </div>

    <!-- mobile search activator button -->
    <div
      v-if="isShowSearchButton"
      class="mobile-search-activator flex flex-ai-c"
    >
      <button @click="activateMobileSearch" :title="searchButtonText">
        {{ searchButtonText }}
      </button>
    </div>

    <search-handler
      v-if="!isLoading && isSearchActive"
      :search-results="resultsData"
      :search-term="searchTerm"
      :active-side="activeSide"
      @more-results="showExpandedSearchResults"
      @clear-results="removeOverlay"
    ></search-handler>
    <search-placeholder v-else-if="isLoading"></search-placeholder>
  </nav>

  <!-- search bar for small screens -->
  <div
    class="mobile-search-wrapper"
    :class="isShowMobileSearch ? 'search-active' : ''"
  >
    <form
      class="search-form mobile-search"
      @submit.prevent="
        activeSide === 'movies'
          ? getMovies(movieSearchLink)
          : getShows(tvSearchLink)
      "
    >
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

  <teleport to="body">
    <div
      :class="[isSearchActive ? 'active-overlay' : '', 'overlay']"
      title="Close Search"
      @click="removeOverlay"
    ></div>
  </teleport>
</template>

<script>
import apiKey from "../../../config.js";
import SearchHandler from "../search/SearchHandler.vue";
import SearchPlaceholder from "../ui/SearchPlaceholder.vue";
const movieSearchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query="`;
const tvSearchAPI = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query="`;

export default {
  name: "TheHeader",
  components: {
    "search-handler": SearchHandler,
    "search-placeholder": SearchPlaceholder,
  },
  props: ["closeButton", "selectedSide"],
  emits: ["no-scroll"],
  data() {
    return {
      isMenuOpen: false,
      searchTerm: "",
      movieSearchLink: movieSearchAPI,
      tvSearchLink: tvSearchAPI,
      isSearchActive: false,
      searchResults: [],
      resultsData: null,
      isMoreResults: false,
      isLoading: false,
      isHidden: false,
      defaultPage: 1,
      activeSide: "movies",
      isShowMobileSearch: false,
      isShowSearchButton: false,
      screenSize: null,
    };
  },
  computed: {
    moviesRoute() {
      const route = {
        path: "/movies",
        query: { page: this.defaultPage },
      };
      return route;
    },
    showsRoute() {
      const route = {
        path: "/shows",
        query: { page: this.defaultPage },
      };
      return route;
    },
    searchButtonText() {
      return this.isShowMobileSearch ? "Close Search" : "Search";
    },
  },
  methods: {
    activateMobileSearch() {
      this.isShowMobileSearch = !this.isShowMobileSearch;
    },
    setActiveStatus() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async getMovies(url) {
      this.isSearchActive = true;
      this.isLoading = true;
      // perform resets before a new fetch request
      this.searchResults = [];
      this.isMoreResults = false;
      this.searchResults.push(this.isSearchActive);

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
    async getShows(url) {
      this.isSearchActive = true;
      this.isLoading = true;
      // perform resets before a new fetch request
      this.searchResults = [];
      this.isMoreResults = false;
      this.searchResults.push(this.isSearchActive);

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
      // store the results data in an object
      this.resultsData = {
        isSearchActive: this.searchResults[0],
        data: this.searchResults[1],
        isMoreResults: this.searchResults[2],
      };
    },
    removeOverlay() {
      this.isLoading = false;
      this.isSearchActive = !this.isSearchActive;
      this.searchResults[0] = false;
      this.searchTerm = "";
      this.isShowMobileSearch = false;
    },
    showExpandedSearchResults() {
      // hide the mini-search, SearchHandler component
      this.isHidden = true;
      this.removeOverlay();
    },
    removeExpandedSearchResults() {
      this.isHidden = false;
      if (this.isSearchActive) {
        this.removeOverlay();
      }
    },
    setActiveSide(side) {
      this.activeSide = side;
    },
    checkWindowSize() {
      // listen to the resize event and call the method to set the info card's position
      window.addEventListener("resize", () => {
        this.screenSize = window.innerWidth;
      });
    },
  },
  watch: {
    isSearchActive() {
      this.$emit("no-scroll");
    },
    closeButton(newValue) {
      // set the value of the isHidden data property if the closeButton prop has a new value
      this.isHidden = newValue;
    },
    selectedSide(side) {
      // watch the selectedSide prop and set active styles to the active side
      this.activeSide = side;
    },
    screenSize(oldValue) {
      // show the mobile search form and search buttons based on screen size
      if (oldValue && oldValue > 939) {
        this.isShowMobileSearch = false;
        this.isShowSearchButton = false;
      }
      if (oldValue && oldValue < 939) {
        this.isShowSearchButton = true;
        if (this.isSearchActive) {
          this.isShowMobileSearch = true;
        }
      }
    },
  },
  beforeMount() {
    this.screenSize = window.innerWidth;
  },
  mounted() {
    // call the method after data has been loaded to the screen
    this.checkWindowSize();
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
  z-index: 3;
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

.mobile-search-activator button,
.nav-options a {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: var(--font-size-18);
  font-weight: bold;
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.mobile-search-activator button {
  font-weight: normal;
  font-size: var(--font-size-16);
}

.mobile-search-activator button:hover,
.nav-options a:hover {
  color: var(--color-smokey-black);
  background-color: var(--color-clouds);
}

.nav-options li.active-side a {
  background-color: var(--color-clouds);
  color: var(--color-smokey-black);
}

.nav-options li:not(:last-child),
.logo {
  margin-right: 2.5rem;
}

.logo {
  position: relative;
  width: 10.625rem;
  height: 3.5625rem;
}

.logo .logo-img {
  position: relative;
  z-index: 2;
}

.logo .logo-text {
  position: absolute;
  top: 50%;
  left: 3px;
  transform: translateY(-50%);
  color: var(--color-clouds);
  z-index: 1;
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

.button-wrapper a {
  display: inline-block;
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

.button-wrapper a:hover {
  outline: var(--color-clouds) 1px solid;
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
}

/* start of mobile search styles */
.mobile-search-wrapper {
  display: none;
  padding: 0.9375rem;
  background-color: var(--color-jet-black);
}

.mobile-search-wrapper.search-active {
  display: block;
}

.search-form.mobile-search input {
  width: 100%;
}
/* end of mobile search styles */

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
  z-index: 3;
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

@media screen and (max-width: 939px) {
  .results-wrapper,
  .placeholder-wrapper {
    top: calc(100% + 78px);
  }
}

@media screen and (max-width: 678px) {
  ul.nav-options {
    display: none;
  }

  .results-wrapper,
  .placeholder-wrapper {
    top: calc(100% + 78px);
    height: calc(100vh - 158px);
  }

  .result__info > div {
    position: relative;
  }
}
</style>