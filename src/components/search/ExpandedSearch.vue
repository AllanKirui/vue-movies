<template>
  <div class="search-container">
    <form
      class="search-form expanded-search"
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

  <div class="results-container wrapper">
    <div class="heading-wrapper flex flex-jc-sb flex-ai-c">
      <h1 v-if="queryParam" class="search-term">
        Showing results for: <span class="text-white">{{ userInput }}</span>
      </h1>
      <p v-if="isResults && isShowPageStatus" class="pages-found">
        Showing page <span class="text-white">{{ pageNum }}</span> of
        <span class="text-white">{{ totalPages }}</span>
      </p>
    </div>

    <!-- If there are results, show them -->
    <div v-if="isResults">
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
                  src="../../assets/rating-icon.svg"
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
    <!-- else show code indicating lack thereof -->
    <div v-if="isNoResults" class="no-results">
      <img
        src="../../assets/search-icon-light.svg"
        width="50"
        height="50"
        alt="no results found image"
      />
      <p>Oops! No results found</p>
    </div>
  </div>
</template>

<script>
import apiKey from "../../../config.js";
const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;

export default {
  name: "ExpandedSearch",
  props: ["pageNum", "searchThis"],
  emits: ["set-status", "total-pages", "reset-pages", "send-id"],
  inject: ["setPath", "setTitleLength", "setOverviewLength", "setDate"],
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
      componentName: "ExpandedSearch",
      isShowInfo: false,
      isShowPageStatus: false,
    };
  },
  methods: {
    async getMovies(url, page) {
      // set loading status to true
      this.$emit("set-status", true);
      this.isShowPageStatus = false;
      // if there's a new searchTerm, emit a custom event to make fetch() get the first page
      if (page === this.defaultPage) {
        this.$emit("reset-pages");
      }
      this.userInput = this.searchTerm;
      this.queryParam = `&page=${page}&query="${this.searchTerm}`;
      // perform resets before a new fetch request
      this.searchResults = [];

      // fetch data
      const response = await fetch(url + this.queryParam);
      const data = await response.json();

      this.removePlaceholder();
      this.isShowPageStatus = true;
      if (data.results.length === 0) {
        this.isNoResults = true;
      } else {
        this.isNoResults = false;
      }
      this.totalPages = data.total_pages;
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
      this.getMovies(this.searchLink, newValue);
    },
  },
  created() {
    // call the getMovies() method if the 'view more results' button from
    // SearchHandler.vue was clicked
    this.searchTerm = this.searchThis;
    this.getMovies(this.searchLink, this.pageNum);
  },
  updated() {
    // call these methods when the page is updated
    this.setInfoCardPosition();
    this.checkWindowSize();
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

.heading-wrapper {
  color: var(--color-spanish-gray);
  margin-bottom: 2.5rem;
}

.pages-found {
  font-size: var(--font-size-18);
}

.search-term .text-white {
  margin-left: 0.3125rem;
}

.content__poster img.no-poster-img {
  padding: 50% 0;
  object-fit: contain;
}

.no-results {
  position: relative;
  top: 6.25rem;
  width: 100%;
  text-align: center;
  font-size: var(--font-size-18);
  color: var(--color-clouds);
}

.no-results img {
  margin-bottom: 0.625rem;
}

@media screen and (max-width: 768px) {
  .results-container {
    margin-top: 1rem;
  }

  .heading-wrapper {
    margin-bottom: 1rem;
    flex-direction: column;
    align-items: start;
  }

  .search-term {
    font-size: var(--font-size-24);
    margin-bottom: 0.625rem;
  }

  .no-results {
    top: 3.125rem;
  }
}
</style>