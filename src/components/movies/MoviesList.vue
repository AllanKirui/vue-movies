<template>
  <!-- show the data once we're done loading -->
  <div v-if="!isLoading" class="results-container wrapper">
    <div>
      <ul
        v-for="result in searchResults"
        :key="result.id"
        class="content-wrapper"
      >
        <!-- set the route for showing a movie's information -->
        <router-link :to="setMovieInfoRoute(result.title, result.id)">
          <li class="content hover" :title="result.title">
            <div class="content__poster">
              <img
                v-if="result.poster_path"
                :src="setPath(result.poster_path)"
                :alt="`poster image for ${result.title}`"
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
        </router-link>
      </ul>
    </div>
  </div>

  <!-- if we're loading, show the content placeholder -->
  <ContentPlaceholder v-else />

  <ThePagination
    v-if="totalPages && !isLoading"
    :received-pages="totalPages"
    :chosen-page="selectedPage"
    @switch-page="switchPages"
  />
</template>

<script>
import apiKey from "../../../config.js";
import ContentPlaceholder from "../ui/ContentPlaceholder.vue";
import ThePagination from "../ui/ThePagination.vue";

export default {
  name: "MoviesList",
  components: { ContentPlaceholder, ThePagination },
  props: ["chosenPage"],
  emits: ["show-button"],
  inject: [
    "setPath",
    "setTitleLength",
    "setDate",
    "setOverviewLength",
    "scrollToTop",
    "setMovieInfoRoute",
  ],
  data() {
    return {
      searchResults: [],
      isShowInfo: false,
      isLoading: false,
      totalPages: null,
      selectedPage: 1, // the default page is 1
      defaultPage: 1,
      activePage: null,
    };
  },
  methods: {
    async getMovies(page) {
      this.updateRoute(page);
      this.isLoading = true;
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

      // perform resets before a new fetch request
      this.searchResults = [];

      // fetch data
      const response = await fetch(url);
      const data = await response.json();
      this.isLoading = false;

      // only get the first 40 pages
      if (data.total_pages > 40) {
        this.totalPages = 40;
      } else {
        this.totalPages = data.total_pages;
      }
      this.searchResults = data.results;
    },
    switchPages(newPage) {
      this.getMovies(newPage);
      this.selectedPage = newPage;
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
    updateRoute(activePage) {
      // update the query parameter on the route link
      this.$router.push({ path: "/movies", query: { page: activePage } });
    },
  },
  watch: {
    selectedPage() {
      // when the selectedPage data property changes, call the scrollToTop method
      this.scrollToTop();
    },
    activePage(newValue) {
      // if there is a new page number, fetch new results
      if (newValue) {
        this.getMovies(newValue);
        this.selectedPage = newValue;
      }
    },
    chosenPage(newValue) {
      // if the chosenPage prop has a value, switch to that page
      if (newValue) {
        this.switchPages(newValue);
      }
    },
  },
  beforeMount() {
    // get the page number from the route's query parameter
    const newPage = +this.$route.query.page;
    // if there is a new page, switch pages else go to the first page
    if (newPage) {
      this.switchPages(newPage);
    } else {
      this.switchPages(this.defaultPage);
    }
  },
  beforeUpdate() {
    // call these methods before the page is shown
    this.setInfoCardPosition();
    this.checkWindowSize();
  },
  updated() {
    // update the activePage property, whenever the query parameter has changed
    this.activePage = +this.$route.query.page;
    // call these methods when the page is updated
    this.setInfoCardPosition();
    this.checkWindowSize();
    // emit a custom event to hide the close button on the header
    this.$emit("show-button", false);
  },
};
</script>