<template>
  <nav class="flex flex-jc-sb">
    <div class="nav-left flex flex-ai-c">
      <div class="burger-wrapper">
        <button
          :class="[isMenuOpen ? 'open' : '', 'burger']"
          :title="isMenuOpen ? 'Close Menu' : 'Open Menu'"
          @click="setActiveStatus"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

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
      v-if="isShowSearchButton && !isExpandedSearch"
      class="mobile-search-activator flex flex-ai-c"
    >
      <!-- show search icon -->
      <button
        v-if="!isShowMobileSearch"
        class="search-btn"
        @click="activateMobileSearch"
        :title="searchButtonText"
      >
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

      <!-- show close icon -->
      <button
        v-else
        class="search-btn close"
        @click="activateMobileSearch"
        :title="searchButtonText"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 5.2916666 5.2916669"
        >
          <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1">
            <g id="g839">
              <path
                style="
                  fill: none;
                  stroke: #ececec;
                  stroke-width: 0.416228;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-opacity: 1;
                "
                d="M 0.14665203,0.15512577 5.1440068,5.1522917"
                id="path4553"
              />
              <path
                style="
                  fill: none;
                  stroke: #ececec;
                  stroke-width: 0.416228;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-opacity: 1;
                "
                d="M 5.1439019,0.15506284 0.1467569,5.1523442"
                id="path4555"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>

    <!-- mobile search form -->
    <div
      class="mobile-search-wrapper"
      :class="isShowMobileSearch ? 'search-active' : ''"
    >
      <form
        class="mobile-search-form"
        :class="isShowMobileSearch ? 'active' : ''"
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
      </form>
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

  <!-- options menu -->
  <div :class="[isMenuOpen ? 'open' : '', 'menu-wrapper']">
    <ul class="menu">
      <!-- movies route -->
      <li
        :class="[
          activeSide === 'movies' ? 'active-menu-item' : '',
          'menu__item',
        ]"
        title="Go to Movies"
      >
        <router-link :to="moviesRoute" @click="removeExpandedSearchResults"
          >Movies</router-link
        >
      </li>
      <!-- tv shows route -->
      <li
        :class="[
          activeSide === 'shows' ? 'active-menu-item' : '',
          'menu__item',
        ]"
        title="Go to Shows"
      >
        <router-link :to="showsRoute" @click="removeExpandedSearchResults"
          >TV Shows</router-link
        >
      </li>
      <!-- popular category route -->
      <li
        :class="[
          category === 'popular' ? 'active-category' : '',
          'menu__item category',
        ]"
        :title="`View popular ${activeSide}`"
      >
        <!-- either show top_rated or popular categories for movies/tv shows -->
        <router-link
          v-if="activeSide === 'movies'"
          :to="popularMoviesRoute"
          @click="setActiveCategory('popular')"
          >Popular</router-link
        >
        <router-link
          v-else
          :to="popularShowsRoute"
          @click="setActiveCategory('popular')"
          >Popular</router-link
        >
      </li>
      <!-- top rated category route -->
      <li
        :class="[
          category === 'top_rated' ? 'active-category' : '',
          'menu__item category',
        ]"
        :title="`View top rated ${activeSide}`"
      >
        <!-- either show top_rated or popular categories for movies/tv shows -->
        <router-link
          v-if="activeSide === 'movies'"
          :to="topRatedMoviesRoute"
          @click="setActiveCategory('top_rated')"
          >Top Rated</router-link
        >
        <router-link
          v-else
          :to="topRatedShowsRoute"
          @click="setActiveCategory('top_rated')"
          >Top Rated</router-link
        >
      </li>
    </ul>
  </div>

  <teleport to="body">
    <div
      :class="[isSearchActive ? 'active-overlay' : '', 'overlay']"
      title="Close Search"
      @click="removeOverlay"
    ></div>
    <div
      :class="[isMenuOpen ? 'active-overlay' : '', 'menu-overlay']"
      title="Close Menu"
      @click="removeMenuOverlay"
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
  props: ["closeButton", "selectedSide", "selectedCategory"],
  emits: ["no-scroll", "set-category", "connection-error"],
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
      defaultCategory: "popular",
      defaultSide: "movies",
      category: null,
      isExpandedSearch: false,
    };
  },
  computed: {
    moviesRoute() {
      const route = {
        path: "/vue-movies/movies",
        query: { category: this.category, page: this.defaultPage },
      };
      return route;
    },
    showsRoute() {
      const route = {
        path: "/vue-movies/shows",
        query: { category: this.category, page: this.defaultPage },
      };
      return route;
    },
    popularMoviesRoute() {
      const route = {
        path: "/vue-movies/movies",
        query: { category: "popular", page: this.defaultPage },
      };
      return route;
    },
    topRatedMoviesRoute() {
      const route = {
        path: "/vue-movies/movies",
        query: { category: "top_rated", page: this.defaultPage },
      };
      return route;
    },
    popularShowsRoute() {
      const route = {
        path: "/vue-movies/shows",
        query: { category: "popular", page: this.defaultPage },
      };
      return route;
    },
    topRatedShowsRoute() {
      const route = {
        path: "/vue-movies/shows",
        query: { category: "top_rated", page: this.defaultPage },
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
      // remove the search results if the prop isShowMobileSearch is false
      if (!this.isShowMobileSearch && this.isSearchActive) {
        this.removeOverlay();
      }
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
      // close the menu if it's open
      this.removeMenuOverlay();

      if (this.searchTerm === "") {
        this.isLoading = false;
        // show no results, change routes
        window.location.reload();
        return;
      }

      try {
        const response = await fetch(url + this.searchTerm);
        const data = await response.json();
        this.isLoading = false;
        this.checkResults(data.results);
        this.$emit("connection-error", false);
      } catch (error) {
        this.$emit("connection-error", true);
      }
    },
    async getShows(url) {
      this.isSearchActive = true;
      this.isLoading = true;
      // perform resets before a new fetch request
      this.searchResults = [];
      this.isMoreResults = false;
      this.searchResults.push(this.isSearchActive);
      // close the menu if it's open
      this.removeMenuOverlay();

      if (this.searchTerm === "") {
        this.isLoading = false;
        // show no results, change routes
        window.location.reload();
        return;
      }

      try {
        const response = await fetch(url + this.searchTerm);
        const data = await response.json();
        this.isLoading = false;
        this.checkResults(data.results);
        this.$emit("connection-error", false);
      } catch (error) {
        this.$emit("connection-error", true);
      }
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
      this.isExpandedSearch = false;
    },
    removeMenuOverlay() {
      this.isMenuOpen = false;
    },
    showExpandedSearchResults() {
      // hide the mini-search, SearchHandler component
      this.isHidden = true;
      this.removeOverlay();
      this.isExpandedSearch = true;
    },
    removeExpandedSearchResults() {
      this.isExpandedSearch = false;
      this.isHidden = false;
      if (this.isSearchActive) {
        this.removeOverlay();
      }
      // close the menu if it's open
      this.removeMenuOverlay();
    },
    setActiveSide(side) {
      this.activeSide = side;
      // close the menu if it's open
      this.removeMenuOverlay();
    },
    checkWindowSize() {
      // listen to the resize event and call the method to set the info card's position
      window.addEventListener("resize", () => {
        this.screenSize = window.innerWidth;
      });
    },
    setActiveCategory(category) {
      // remove expanded search results if active
      this.removeExpandedSearchResults();
      // emit a custom event to carry the selected category
      this.category = category;
      this.$emit("set-category", category);
    },
    getCategory() {
      // check if there is a chosen category, or use the default instead
      this.category = this.category ? this.category : this.defaultCategory;
    },
  },
  watch: {
    isSearchActive() {
      this.$emit("no-scroll");
    },
    isMenuOpen() {
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
    screenSize(newValue) {
      // show the mobile search form and search buttons based on screen size
      if (newValue && newValue >= 939) {
        this.isShowMobileSearch = false;
        this.isShowSearchButton = false;
      }
      if (newValue && newValue <= 938) {
        this.isShowSearchButton = true;
        if (this.isSearchActive) {
          this.isShowMobileSearch = true;
        }
      }
    },
    selectedCategory(category) {
      // watch the selectedSide prop and set active styles to the active category
      this.category = category;
    },
    isHidden(newValue) {
      // watch the isHidden prop
      if (newValue) {
        // if it has a newValue of true, then the expanded search is active
        this.isExpandedSearch = true;
      } else {
        // otherwise, it's closed
        this.isExpandedSearch = false;
      }
    },
    isShowMobileSearch(newValue) {
      // close the menu when mobile search is active
      if (newValue) {
        this.isMenuOpen = false;
      } else {
        this.searchTerm = "";
      }
    },
  },
  beforeMount() {
    this.screenSize = window.innerWidth;

    // get stored app states from local storage
    const retrievedState = JSON.parse(localStorage.getItem("appState"));
    // if there's no stored app states
    if (!retrievedState) {
      this.getCategory();
      return;
    }
    // use the stored app states
    const retrievedSide = retrievedState.lastActiveSide;
    const retrievedCategory = retrievedState.lastActiveCategory;
    this.activeSide = retrievedSide ? retrievedSide : this.defaultSide;
    this.category = retrievedCategory
      ? retrievedCategory
      : this.defaultCategory;
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

.burger-wrapper {
  margin-right: 1.5rem;
}

.burger {
  background-color: transparent;
  width: 1.875rem;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 2;
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
  transform-origin: 0px 20px;
}

.burger span:last-child {
  margin-bottom: 0;
  transform-origin: 29px 8px;
}

.burger.open span:first-child {
  top: 1px;
  left: -12px;
  transform: rotateZ(45deg);
}

.burger.open span:last-child {
  top: -2px;
  left: -6px;
  transform: rotateZ(45deg);
}

.burger.open span:nth-child(2) {
  width: 1.25rem;
  height: 1.25rem;
  transform: rotateZ(-45deg);
  transform-origin: 17px 0;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 50px;
  right: 7px;
}

.menu-wrapper {
  position: absolute;
  top: 80px;
  left: 0;
  max-width: 15.625rem;
  width: 100%;
  padding: 1rem 0;
  border-bottom-right-radius: 8px;
  background-color: var(--color-clouds);
  transform: translateX(-101%);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  transition: transform 0.3s ease-in-out;
  z-index: 4;
}

.menu-wrapper.open {
  transform: translateX(0);
}

.menu-wrapper .menu .menu__item a {
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-18);
  font-weight: bold;
  color: var(--color-jet-black);
  transition: all 0.15s ease-in-out;
}

.menu-wrapper .menu .menu__item a::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border: 1px solid black;
  border-radius: 50px;
  transition: background 0.15s ease-in-out;
}

.menu-wrapper .menu .menu__item:hover a {
  padding: 0.75rem 1.75rem;
}

.menu-wrapper .menu .menu__item:hover a::before {
  background-color: var(--color-jet-black);
}

.menu-wrapper .menu .menu__item.active-category a::before,
.menu-wrapper .menu .menu__item.category:hover a::before {
  background-color: var(--color-spanish-gray);
}

.menu-wrapper .menu .menu__item.active-menu-item a::before {
  background-color: var(--color-jet-black);
}

.nav-options {
  list-style: none;
  padding: 0;
}

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
  top: 50%;
  transform: translateY(-50%);
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
.mobile-search-activator {
  z-index: 5;
}

.mobile-search-activator button.close {
  border-radius: 50px;
  background-color: var(--color-smokey-black);
}

.mobile-search-wrapper {
  position: absolute;
  top: 50%;
  right: -2px;
  transform: translateY(-50%);
  width: 0%;
  height: 100%;
  background-image: linear-gradient(120deg, #090909 0%, #212429 100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease-in-out;
  z-index: 4;
}

.mobile-search-wrapper.search-active {
  width: calc(100vw + 2px);
  opacity: 1;
  visibility: visible;
}

.search-form.mobile-search input {
  width: 100%;
}

.mobile-search-form label {
  display: none;
}

.mobile-search-form input {
  position: absolute;
  top: 50%;
  right: 0;
  height: 101%;
  transform: translateY(-50%);
  width: 50px;
  padding: 1.375rem 3.75rem 1.375rem 1.875rem;
  outline: none;
  border: none;
  background-image: linear-gradient(120deg, #000000 0%, #111111 100%);
  color: var(--color-clouds);
  font-family: "PT Sans", sans-serif;
  font-size: var(--font-size-16);
  opacity: 0;
  transition: width 0.4s ease-in-out, opacity 0.6s ease-in-out;
  z-index: 3;
}

.mobile-search-form input::placeholder {
  color: var(--color-clouds);
  opacity: 0;
  visibility: hidden;
  transition: opacity 1s ease-in-out;
}

.mobile-search-form.active input {
  opacity: 1;
  /* width: calc(100vw - 30px); */
  width: 100%;
}

.mobile-search-form.active input::placeholder {
  opacity: 1;
  visibility: visible;
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
  z-index: 3;
}

.placeholder-wrapper {
  top: -29.375rem;
  animation: slide 0.6s forwards;
}

.results-wrapper {
  overflow-y: auto;
}

@keyframes slide {
  100% {
    top: 100%;
  }
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

@media screen and (max-width: 678px) {
  ul.nav-options {
    display: none;
  }

  .results-wrapper,
  .placeholder-wrapper {
    height: calc(100vh - 78px);
  }

  .result__info > div {
    position: relative;
  }
}

@media screen and (max-width: 480px) {
  .logo .logo-img {
    width: 140px;
    height: 47px;
  }
}
</style>