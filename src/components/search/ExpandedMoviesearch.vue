<template>
  <div class="search-container">
    <form
      class="search-form expanded-search"
      @submit.prevent="getMovies(searchLink, defaultPage)"
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

  <div class="results-container wrapper expanded-search flex flex-fd-c">
    <div class="heading-wrapper flex flex-jc-sb flex-ai-c">
      <h1 v-if="queryParam" class="search-term">
        Showing results for: <span class="text-white">{{ userInput }}</span>
      </h1>
      <p v-if="isResults && !isLoading && !isNoResults" class="pages-found">
        Showing page
        <span class="text-white">{{ selectedPage }}</span> of
        <span class="text-white">{{ totalPages }}</span>
      </p>
    </div>

    <!-- show the data once we're done loading -->
    <div v-if="!isLoading">
      <div>
        <ul
          v-for="movie in searchResults"
          :key="movie.id"
          class="content-wrapper"
        >
          <router-link
            :to="setMovieInfoRoute(movie.title, movie.id)"
            @click="$emit('show-button', false)"
          >
            <li class="content hover" :title="movie.title">
              <div class="content__poster">
                <img
                  v-if="movie.poster_path"
                  :src="setPath(movie.poster_path)"
                  :alt="`poster image for ${movie.title}`"
                  class="poster-img"
                />
                <img
                  v-else
                  src="../../assets/poster-placeholder.png"
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
                <p class="tag">Movie</p>
              </div>
              <div class="content__info">
                <h3 class="content__info-title">
                  {{ setTitleLength(movie.title) }}
                </h3>
                <div class="meta flex flex-jc-sb">
                  <p v-if="movie.release_date" class="content__info-date">
                    {{ setDate(movie.release_date) }}
                  </p>
                  <p v-else class="content__info-date">n/a</p>
                  <p class="content__info-rating">
                    <img
                      src="../../assets/rating-icon.svg"
                      width="15"
                      height="14.4"
                      alt="star icon"
                    />{{ movie.vote_average }}
                  </p>
                </div>
              </div>
              <!-- movie info card -->
              <div v-if="isShowInfo" class="hover__info">
                <h2 class="hover__info-title">{{ movie.title }}</h2>
                <span class="grey-bg"></span>
                <p v-if="movie.overview" class="hover__info-overview">
                  {{ setOverviewLength(movie.overview, overviewLength) }}
                </p>
                <p v-else class="hover__info-overview">n/a</p>

                <div class="meta__info">
                  <div class="meta__info-rating flex">
                    <p class="description">Rating:</p>
                    <p class="data">{{ movie.vote_average }} / 10</p>
                  </div>
                  <div class="meta__info-release flex">
                    <p class="description">Release:</p>
                    <p v-if="movie.release_date" class="data">
                      {{ setDate(movie.release_date) }}
                    </p>
                    <p v-else class="data">n/a</p>
                  </div>
                </div>
                <button :title="movie.title">View More Info</button>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
      <!-- else show code indicating lack thereof -->
      <div v-if="isNoResults" class="no-results expanded-search">
        <img
          src="../../assets/search-icon-light.svg"
          width="50"
          height="50"
          alt="no results found image"
        />
        <p>Oops! No results found</p>
      </div>
    </div>
  </div>

  <!-- if we're loading, show the content placeholder -->
  <div class="expanded-search-placeholder">
    <ContentPlaceholder v-if="isLoading" />
  </div>

  <div class="pagination expanded-search">
    <ThePagination
      v-if="totalPages && !isLoading"
      :received-pages="totalPages"
      :chosen-page="selectedPage"
      @switch-page="switchPages"
    />
  </div>
</template>

<script>
import apiKey from "../../../config.js";
import ContentPlaceholder from "../ui/ContentPlaceholder.vue";
import ThePagination from "../ui/ThePagination.vue";
const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;

export default {
  name: "ExpandedSearch",
  components: { ContentPlaceholder, ThePagination },
  emits: ["show-button", "activated-side"],
  inject: [
    "setPath",
    "setTitleLength",
    "setOverviewLength",
    "setDate",
    "scrollToTop",
    "setMovieInfoRoute",
  ],
  data() {
    return {
      searchTerm: "",
      userInput: "",
      queryParam: "", // to hold the page to fetch and the query
      searchLink: searchAPI,
      searchResults: [],
      isResults: false,
      isNoResults: false,
      totalPages: null,
      defaultPage: 1,
      selectedPage: 1,
      isShowInfo: false,
      isLoading: false,
      overviewLength: 150, // to show 150 characters for overview
    };
  },
  methods: {
    async getMovies(url, page) {
      this.updateRoute(this.searchTerm, page);
      this.isLoading = true;
      // if there's a new searchTerm, emit a custom event to make fetch() get the first page
      if (page === this.defaultPage) {
        this.selectedPage = 1;
      }
      this.userInput = this.searchTerm;
      this.queryParam = `&page=${page}&query="${this.searchTerm}`;
      // perform resets before a new fetch request
      this.searchResults = [];

      // fetch data
      const response = await fetch(url + this.queryParam);
      const data = await response.json();

      this.isResults = true;
      this.isLoading = false;
      this.totalPages = this.getFiftyPages(data.total_pages);
      this.isNoResults = this.checkDataLength(data.results);
      this.searchResults = data.results;
    },
    switchPages(newPage) {
      this.getMovies(this.searchLink, newPage);
      this.selectedPage = newPage;
    },
    getFiftyPages(receivedPages) {
      // only get the first 50 pages
      if (receivedPages > 50) return 50;
      return receivedPages;
    },
    checkDataLength(results) {
      if (results.length === 0) return true;
      return false;
    },
    updateRoute(searchTerm, activePage) {
      // update the query parameter on the route link
      this.$router.push({
        path: "/movies/search",
        query: { keyword: searchTerm, page: activePage },
      });
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
    selectedPage() {
      // when the selectedPage data property changes, call the scrollToTop method
      this.scrollToTop();
    },
  },
  beforeMount() {
    // get the page number from the route's query parameter
    const newPage = +this.$route.query.page;
    // if there is a new page, switch pages
    if (newPage) {
      this.switchPages(newPage);
    }
    // emit a custom event that sets active styling on the header links
    this.$emit("activated-side", "movies");
  },
  created() {
    // get the search term from the keyword prop on the query parameter
    this.searchTerm = this.$route.query.keyword;
    // emit a custom event to show the close button on the header
    this.$emit("show-button", true);

    // check if the active path is /movies/search then show the close button
    const activePath = this.$route.path;
    if (activePath === "/movies/search") {
      this.$emit("show-button", true);
    }
  },
  beforeUpdate() {
    // call these methods before the page is shown
    this.setInfoCardPosition();
    this.checkWindowSize();
  },
  updated() {
    // call these methods when the page is updated
    this.setInfoCardPosition();
    this.checkWindowSize();
  },
};
</script>