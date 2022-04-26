<template>
  <div :class="[isSearchActive ? 'active' : '', 'results-wrapper']">
    <!-- show movie search handler for movies side of the site -->
    <div v-if="activatedSide === 'movies'">
      <ul v-for="movie in results" :key="movie.id">
        <!-- set the route for showing a movie's information -->
        <router-link :to="setMovieInfoRoute(movie.title, movie.id)">
          <li
            class="result flex"
            @click="$emit('clear-results')"
            :title="movie.title"
          >
            <div class="result__poster">
              <img
                v-if="movie.poster_path"
                :src="setPath(movie.poster_path)"
                :alt="`poster image for ${movie.title}`"
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
                v-if="movie.poster_path"
                src="../../assets/poster-placeholder.png"
                width="70"
                height="35.3"
                alt="placeholder image"
                class="placeholder-img"
              />
            </div>
            <div class="result__info flex flex-fd-c flex-jc-sb">
              <!-- top half -->
              <div class="top">
                <h3 class="result__info-title">{{ movie.title }}</h3>
                <p v-if="movie.overview" class="result__info-overview">
                  {{ setOverviewLength(movie.overview, overviewLength) }}
                </p>
                <p v-else class="result__info-overview">n/a</p>
              </div>
              <!-- bottom half -->
              <div class="bottom flex">
                <p v-if="movie.release_date" class="result__info-date">
                  {{ movie.release_date }}
                </p>
                <p v-else class="result__info-date">n/a</p>
                <p class="result__info-rating flex flex-ai-c">
                  <img
                    src="../../assets/rating-icon.svg"
                    width="15"
                    height="14.4"
                    alt="star icon"
                  />{{ movie.vote_average }}
                </p>
              </div>
            </div>
          </li>
        </router-link>
      </ul>
      <!-- set the route to view more movie results -->
      <router-link
        :to="newRoute"
        v-if="isMoreResults"
        @click="$emit('more-results')"
        class="view-more-btn"
        title="View More Results"
      >
        View More Results
      </router-link>
    </div>

    <!-- show tv show search handler for tv show side of the site -->
    <div v-else>
      <ul v-for="show in results" :key="show.id">
        <!-- set the route for showing a tv show's information -->
        <router-link :to="setShowsInfoRoute(show.name, show.id)">
          <li
            class="result flex"
            @click="$emit('clear-results')"
            :title="show.name"
          >
            <div class="result__poster">
              <img
                v-if="show.poster_path"
                :src="setPath(show.poster_path)"
                :alt="`poster image for ${show.name}`"
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
                v-if="show.poster_path"
                src="../../assets/poster-placeholder.png"
                width="70"
                height="35.3"
                alt="placeholder image"
                class="placeholder-img"
              />
            </div>
            <div class="result__info flex flex-fd-c">
              <!-- top half -->
              <div class="top">
                <h3 class="result__info-title">{{ show.name }}</h3>
                <p v-if="show.overview" class="result__info-overview">
                  {{ setOverviewLength(show.overview, overviewLength) }}
                </p>
                <p v-else class="result__info-overview">n/a</p>
              </div>
              <!-- bottom half -->
              <div class="bottom flex">
                <p v-if="show.first_air_date" class="result__info-date">
                  {{ show.first_air_date }}
                </p>
                <p v-else class="result__info-date">n/a</p>
                <p class="result__info-rating flex flex-ai-c">
                  <img
                    src="../../assets/rating-icon.svg"
                    width="15"
                    height="14.4"
                    alt="star icon"
                  />{{ show.vote_average }}
                </p>
              </div>
            </div>
          </li>
        </router-link>
      </ul>
      <!-- set the route to view more tv show results -->
      <router-link
        :to="newRoute"
        v-if="isMoreResults"
        @click="$emit('more-results')"
        class="view-more-btn"
        title="View More Results"
      >
        View More Results
      </router-link>
    </div>

    <!-- Code to show if there are no results found -->
    <div
      v-if="results.length === 0"
      class="result no-result flex flex-jc-c flex-ai-c flex-fd-c"
    >
      <img
        src="../../assets/search-icon-light.svg"
        width="35"
        height="35"
        alt="no results found image"
      />
      <p>Oops! No results found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchHandler",
  props: ["searchResults", "searchTerm", "activeSide"],
  emits: ["more-results", "clear-results"],
  inject: [
    "setOverviewLength",
    "setPath",
    "setMovieInfoRoute",
    "setShowsInfoRoute",
  ],
  data() {
    return {
      isSearchActive: this.searchResults.isSearchActive,
      results: this.searchResults.data,
      isMoreResults: this.searchResults.isMoreResults,
      activatedSide: null, // to hold either 'movies' or 'shows'
      overviewLength: 150, // to show 150 characters for overview
      screenSize: null,
    };
  },
  computed: {
    newRoute() {
      let route = null;
      // conditionally set a route to ExpandedSearch component showing either movie or tv show results
      if (this.activatedSide === "movies") {
        route = {
          path: "/movies/search",
          query: { keyword: this.searchTerm, page: 1 },
        };
      } else {
        route = {
          path: "/shows/search",
          query: { keyword: this.searchTerm, page: 1 },
        };
      }
      return route;
    },
  },
  methods: {
    checkWindowSize() {
      // listen to the resize event and call the method to set the info card's position
      window.addEventListener("resize", () => {
        this.screenSize = window.innerWidth;
      });
    },
  },
  watch: {
    screenSize(newValue) {
      // update the overviewlength for small screens (500px, 375px and below)
      if (newValue && newValue < 500) {
        this.overviewLength = 90;
      }
      if (newValue && newValue > 500) {
        this.overviewLength = 150;
      }
      if (newValue && newValue < 375) {
        this.overviewLength = 40;
      }
    },
  },
  beforeMount() {
    this.activatedSide = this.activeSide;
    this.screenSize = window.innerWidth;
  },
  mounted() {
    // call the method after data has been loaded to the screen
    this.checkWindowSize();
  },
};
</script>

<style scoped>
.result {
  cursor: pointer;
}

.result:hover {
  outline: 1px solid var(--color-clouds);
}

.result__poster {
  position: relative;
}

.result__poster img {
  width: 100%;
  height: 100%;
}

.result__poster img.poster-img {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
}

.result__poster img.no-poster-img {
  object-fit: contain;
}

.result__info {
  color: var(--color-white);
  width: 100%;
}

.result__info .bottom {
  gap: 1rem;
}

.result__info .bottom p > img {
  margin-right: 3px;
}

.result__info .bottom .result__info-date,
.result__info .bottom .result__info-rating {
  color: var(--color-clouds);
}

.result__info .top .result__info-title {
  font-size: var(--font-size-18);
}

.result__info .top .result__info-overview {
  font-size: var(--font-size-16);
  margin-bottom: 0.625rem;
}

.view-more-btn {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 1.25rem 0;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
  font-family: inherit;
  font-size: var(--font-size-16);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.view-more-btn:hover {
  color: var(--color-smokey-black);
  background-color: var(--color-clouds);
}

.result.no-result {
  min-height: 8.125rem;
  text-align: center;
  font-size: var(--font-size-16);
  color: var(--color-clouds);
}

.result.no-result:hover {
  outline: none;
  cursor: initial;
}

.result.no-result img {
  margin-bottom: 0.625rem;
}
</style>