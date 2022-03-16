<template>
  <!-- show the data once we're done loading -->
  <div v-if="!isLoading">
    <!-- show the backdrop image if it is available -->
    <div
      v-if="result"
      class="info-wrapper wrapper"
      :style="
        result.backdrop_path
          ? {
              background:
                `url(` +
                setBackdropPath(result.backdrop_path) +
                `) no-repeat top center/cover`,
            }
          : ''
      "
    >
      <!-- dark filter for backdrop -->
      <div class="filter"></div>
      <div class="content-poster">
        <img
          v-if="result.poster_path"
          :src="setPath(result.poster_path)"
          :title="result.name"
          :alt="`poster image for ${result.name}`"
          width="320"
          class="poster-img"
        />
        <img
          v-else
          src="../../assets/no-poster-img.svg"
          width="200"
          alt="no poster image"
          class="no-poster-img"
        />
        <!-- show a placeholder image before the poster loads -->
        <img
          v-if="result.poster_path"
          src="../../assets/poster-placeholder.png"
          width="320"
          alt="placeholder image"
          class="placeholder-img"
        />
      </div>
    </div>
  </div>
</template>

<script>
import apiKey from "../../../config.js";

export default {
  name: "ShowInfo",
  emits: ["show-button", "activated-side"],
  inject: ["setPath", "setBackdropPath", "setDate", "setTime", "scrollToTop"],
  data() {
    return {
      result: null,
      isLoaded: false,
      videos: [],
      trailerLink: [],
      showId: null,
      isLoading: false,
      idFromSearch: null,
    };
  },
  methods: {
    async getShows(id) {
      this.scrollToTop();
      this.isLoaded = false;
      this.isLoading = true;
      const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`;

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      this.result = data;
      this.isLoaded = true;
      this.isLoading = false;
    },
  },
  watch: {
    showId(newValue) {
      // call the getShows() method to fetch tv shows when the showId prop has a value
      if (newValue) {
        this.getShows(newValue);
      }
    },
    idFromSearch(newValue) {
      // watch the id gotten from mini search and fetch tv shows if it has a value
      if (newValue) {
        this.getShows(newValue);
        // set the value of the show id data prop to be the value of the id from search
        this.showId = newValue;
      }
    },
  },
  beforeMount() {
    // get the show Id from the query parameter before the show is displayed onscreen
    this.showId = +this.$route.query.id;
    // emit a custom event that sets active styling on the header links
    this.$emit("activated-side", "shows");
  },
  updated() {
    // get the id which has been updated from outside the component
    this.idFromSearch = +this.$route.query.id;
    // emit a custom event to hide the close button on the header
    this.$emit("show-button", false);
  },
};
</script>

<style scoped>
.info-wrapper {
  display: grid;
  gap: 3.125rem;
  grid-template-columns: 23.5% auto;
  margin-bottom: 2.8125rem;
  padding: 2.1875rem 0.9375rem;
  position: relative;
}

.trailer-wrapper .trailer-card .filter,
.info-wrapper .filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
}

.content-poster {
  grid-column: 1/2;
  background-color: var(--color-jet-black);
  position: relative;
}

.content-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.content-poster img.poster-img {
  position: absolute;
  top: 0;
  left: 0;
}

.content-poster img.no-poster-img {
  padding: 7.5rem 1.25rem;
  object-fit: contain;
}

.content-text {
  grid-column: 2/3;
  text-shadow: 1px 1px 2px var(--color-jet-black);
}

.content-poster,
.content-text {
  z-index: 2;
}

.title {
  margin-top: 1.375rem;
  margin-bottom: 1.125rem;
  color: var(--color-white);
}

.title .content-tagline {
  font-style: italic;
}

.meta {
  font-size: var(--font-size-18);
  color: var(--color-clouds);
}

.meta .meta-section-1 {
  gap: 1.375rem;
  margin-bottom: 1.375rem;
}

.meta .content-rating img {
  margin-right: 0.3125rem;
}

.meta .meta-section-2 {
  margin-bottom: 1.75rem;
}

.meta .meta-section-3 {
  gap: 0.3125rem;
  color: var(--color-silver-chalice);
}

.meta .meta-section-2 .content-overview,
.meta .meta-section-3 .content-genre div p {
  color: var(--color-white);
}

.meta .meta-section-3 .content-country > p:first-child,
.meta .meta-section-3 .content-genre > p:first-child,
.meta .meta-section-3 .content-release > p:first-child {
  width: 4.375rem;
  margin-right: 2rem;
}

.meta .meta-section-3 .content-country p span,
.meta .meta-section-3 .content-genre p span {
  color: var(--color-silver-chalice);
}

.trailer-wrapper {
  margin-bottom: 2.8125rem;
  padding: 0 0.9375rem;
  position: relative;
}

.trailer-wrapper .heading {
  margin-bottom: 2.1875rem;
  font-size: var(--font-size-28);
  font-weight: 400;
  color: var(--color-clouds);
}

.trailer-wrapper .trailer-card {
  max-width: 37.5rem;
  max-height: 21.875rem;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.trailer-wrapper .trailer-card img.backdrop,
.trailer-wrapper .trailer-card .filter {
  border-radius: 10px;
}

.trailer-wrapper .trailer-card .filter {
  background: rgba(0, 0, 0, 0.65);
  z-index: 2;
}

.trailer-wrapper .trailer-card img.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;
}

.trailer-wrapper .trailer-card img.backdrop-placeholder {
  width: 100%;
  height: 100%;
}

.trailer-wrapper .trailer-card:hover img.backdrop {
  transform: scale(1.025);
}

.trailer-wrapper .trailer-card img.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  z-index: 3;
}

.trailer-wrapper .trailer-card:hover img.play-icon {
  visibility: visible;
  opacity: 1;
}

@media screen and (max-width: 939px) {
  .info-wrapper {
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr auto;
  }

  .info-wrapper .content-poster {
    width: 31.3333333333%;
    margin: 0 auto;
    grid-column: span 1;
    grid-row: 1/2;
  }

  .info-wrapper .content-text {
    grid-column: span 1;
    grid-row: 2/3;
  }

  .info-wrapper .content-text .title {
    margin-top: 0;
  }
}

@media screen and (max-width: 576px) {
  .trailer-wrapper .trailer-card img.play-icon {
    visibility: visible;
    opacity: 1;
  }

  .content-poster img.no-poster-img {
    padding: 5.5rem 1.25rem;
  }
}
</style>