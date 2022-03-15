<template>
  <!-- show the data once we're done loading -->
  <div v-if="!isLoading" class="results-container wrapper">
    <div>
      <ul
        v-for="result in searchResults"
        :key="result.id"
        class="content-wrapper"
      >
        <li class="content hover" :title="result.name">
          <div class="content__poster">
            <img
              v-if="result.poster_path"
              :src="setPath(result.poster_path)"
              :alt="`poster image for ${result.name}`"
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
            <p class="tag">TV Show</p>
          </div>
          <div class="content__info">
            <h3 class="content__info-title">
              {{ setTitleLength(result.name) }}
            </h3>
            <div class="meta flex flex-jc-sb">
              <p v-if="result.first_air_date" class="content__info-date">
                {{ setDate(result.first_air_date) }}
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
          <!-- tv show info card -->
          <div v-if="isShowInfo" class="hover__info">
            <h2 class="hover__info-title">{{ result.name }}</h2>
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
                <p v-if="result.first_air_date" class="data">
                  {{ setDate(result.first_air_date) }}
                </p>
                <p v-else class="data">n/a</p>
              </div>
            </div>
            <button :title="result.name">View More Info</button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- if we're loading, show the content placeholder -->
  <ContentPlaceholder v-else />
</template>

<script>
import apiKey from "../../../config.js";
import ContentPlaceholder from "../ui/ContentPlaceholder.vue";

export default {
  name: "ShowsList",
  components: { ContentPlaceholder },
  props: ["pageNum"],
  inject: [
    "setPath",
    "setTitleLength",
    "setDate",
    "setOverviewLength",
    "scrollToTop",
    "setShowsInfoRoute",
  ],
  data() {
    return {
      searchResults: [],
      isShowInfo: false,
      isLoading: false,
    };
  },
  methods: {
    async getShows(page) {
      this.isLoading = true;
      const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}`;
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
      console.log(url);
    },
    setInfoCardPosition() {
      let viewportWidth = window.innerWidth;
      // only show hover information for screens 768px and above
      if (viewportWidth >= 1024) {
        this.isShowInfo = true;
        const showItems = document.querySelectorAll(".hover__info");
        showItems.forEach((show) => {
          // find the distance to the right of each show card
          let distToRight = show.getBoundingClientRect().right;

          // add an extra 250px to the distance, to make sure that it will be more
          // than the viewport width, then set the appropriate position for the info card
          if (
            distToRight > viewportWidth ||
            distToRight + 250 > viewportWidth
          ) {
            show.style.right = "95%";
          } else {
            show.style.right = "-110%";
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
      // call the getShows() method to fetch shows when switching pages
      this.getShows(newValue);
    },
  },
  beforeMount() {
    // call the getShows() method
    this.getShows(this.pageNum);
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