<template>
  <div class="results-container wrapper">
    <!-- If there are results, show them -->
    <div v-if="isResults && isLoaded" class="results">
      <h2 class="heading">You might also like</h2>
      <ul v-for="show in similarShows" :key="show.id" class="content-wrapper">
        <!-- set the route for showing a tv show's information -->
        <router-link :to="setShowsInfoRoute(show.name, show.id)">
          <li
            class="content hover"
            @click="sendShowId(show.id)"
            :title="show.name"
          >
            <div class="content__poster">
              <img
                v-if="show.poster_path"
                :src="setPath(show.poster_path)"
                :alt="`poster image for ${show.name}`"
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
                v-if="show.poster_path"
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
                {{ setTitleLength(show.name) }}
              </h3>
              <div class="meta flex flex-jc-sb">
                <p v-if="show.first_air_date" class="content__info-date">
                  {{ setDate(show.first_air_date) }}
                </p>
                <p v-else class="content__info-date">n/a</p>
                <p class="content__info-rating">
                  <img
                    src="../../assets/rating-icon.svg"
                    width="15"
                    height="14.4"
                    alt="star icon"
                  />{{ roundRating(show.vote_average) }}
                </p>
              </div>
            </div>
            <!-- tv show info card -->
            <div v-if="isShowHoverInfo" class="hover__info">
              <h2 class="hover__info-title">{{ show.name }}</h2>
              <span class="grey-bg"></span>
              <p v-if="show.overview" class="hover__info-overview">
                {{ setOverviewLength(show.overview) }}
              </p>
              <p v-else class="hover__info-overview">n/a</p>

              <div class="meta__info">
                <div class="meta__info-rating flex">
                  <p class="description">Rating:</p>
                  <p class="data">{{ roundRating(show.vote_average) }} / 10</p>
                </div>
                <div class="meta__info-release flex">
                  <p class="description">Release:</p>
                  <p v-if="show.first_air_date" class="data">
                    {{ setDate(show.first_air_date) }}
                  </p>
                  <p v-else class="data">n/a</p>
                </div>
              </div>
              <button :title="show.name">View More Info</button>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import apiKey from "../../../config.js";

export default {
  name: "SimilarShows",
  props: ["showId", "isLoaded"],
  emits: ["send-id"],
  inject: [
    "scrollToTop",
    "setOverviewLength",
    "setPath",
    "setTitleLength",
    "setDate",
    "setShowsInfoRoute",
  ],
  data() {
    return {
      similarShows: [],
      isResults: false,
      isShowHoverInfo: false,
    };
  },
  methods: {
    async getShows(id) {
      const url = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apiKey}`;
      const alt_url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      // check if there are recommended tv shows
      if (data.results.length !== 0) {
        this.setDataLength(data.results);
      } else {
        // if there are no recommended tv shows, fetch data using alternate url
        const response = await fetch(alt_url);
        const data = await response.json();
        this.setDataLength(data.results);
      }
    },
    roundRating(rating) {
      return Math.round(rating * 10) / 10;
    },
    sendShowId(id) {
      this.$emit("send-id", id);
    },
    setDataLength(data) {
      // only get the first 8 results
      if (data.length >= 8) {
        this.isResults = true;
        for (let i = 0; i < 8; i++) {
          this.similarShows.push(data[i]);
        }
      } else if (data.length > 0 && data.length < 8) {
        this.isResults = true;
        for (let i = 0; i < data.length; i++) {
          this.similarShows.push(data[i]);
        }
      }
    },
    setInfoCardPosition() {
      let viewportWidth = window.innerWidth;
      // only show hover information for screens 768px and above
      if (viewportWidth >= 1024) {
        this.isShowHoverInfo = true;
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
        this.isShowHoverInfo = false;
      }
    },
    checkWindowSize() {
      // listen to the resize event and call the method to set the info card's position
      window.addEventListener("resize", this.setInfoCardPosition);
    },
  },
  updated() {
    // call these methods when the page is updated
    this.setInfoCardPosition();
    this.checkWindowSize();
  },
  beforeMount() {
    if (this.showId) {
      this.scrollToTop();
      // perform resets before a new fetch request
      this.similarShows = [];
      this.isResults = false;
      this.getShows(this.showId);
      // call these methods before the component is mounted
      this.setInfoCardPosition();
      this.checkWindowSize();
    } else {
      // perform resets if there was a previous value for the showId prop
      this.similarShows = [];
    }
  },
};
</script>

<style scoped>
.heading {
  margin-bottom: 2.1875rem;
  font-size: var(--font-size-28);
  font-weight: 400;
  color: var(--color-clouds);
}
</style>