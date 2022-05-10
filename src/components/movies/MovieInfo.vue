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
          :title="result.title"
          :alt="`poster image for ${result.title}`"
          width="320"
          height="480"
          class="poster-img"
        />
        <img
          v-else
          src="../../assets/poster-placeholder.png"
          width="320"
          height="480"
          alt="no poster image"
          class="no-poster-img"
        />
        <!-- show a placeholder image before the poster loads -->
        <img
          v-if="result.poster_path"
          src="../../assets/poster-placeholder.png"
          width="320"
          height="480"
          alt="placeholder image"
          class="placeholder-img"
        />
      </div>
      <div class="content-text">
        <!-- movie title and tagline -->
        <div class="title">
          <h1 class="content-title">{{ result.title }}</h1>
          <p v-if="result.tagline" class="content-tagline">
            {{ result.tagline }}
          </p>
        </div>

        <div class="meta">
          <!-- movie rating and runtime -->
          <div class="meta-section-1 flex flex-fw-w">
            <p class="content-rating">
              <img
                src="../../assets/rating-icon.svg"
                width="15"
                height="14.4"
                alt="star icon"
              />{{ result.vote_average }}
            </p>
            <p v-if="result.runtime" class="content-runtime">
              {{ setTime(result.runtime) }}
            </p>
            <p v-else class="content-runtime">n/a</p>
          </div>

          <!-- movie overview -->
          <div class="meta-section-2">
            <p v-if="result.overview" class="content-overview">
              {{ result.overview }}
            </p>
            <p v-else class="content-overview">n/a</p>
          </div>

          <!-- movie country of production -->
          <div class="meta-section-3 flex flex-fd-c">
            <div
              v-if="result.production_countries.length > 0"
              class="content-country spaced flex flex-fw-w"
            >
              <p>Countries:</p>
              <div
                v-for="country in result.production_countries"
                :key="country.name"
              >
                <!-- show commas for all items except the last -->
                <p>
                  {{ country.name
                  }}<span
                    v-if="
                      result.production_countries.indexOf(country) !==
                      result.production_countries.length - 1
                    "
                    >,&nbsp;</span
                  >
                </p>
              </div>
            </div>
            <div v-else class="content-country spaced flex">
              <p>Countries:</p>
              <p>n/a</p>
            </div>
            <!-- movie genre -->
            <div
              v-if="result.genres.length > 0"
              class="content-genre spaced flex flex-fw-w"
            >
              <p>Genres:</p>
              <div v-for="genre in result.genres" :key="genre.id">
                <!-- show commas for all items except the last -->
                <p>
                  {{ genre.name
                  }}<span
                    v-if="
                      result.genres.indexOf(genre) !== result.genres.length - 1
                    "
                    >,&nbsp;</span
                  >
                </p>
              </div>
            </div>
            <div v-else class="content-genre spaced flex">
              <p>Genres:</p>
              <p>n/a</p>
            </div>
            <!-- movie release date -->
            <div class="content-release spaced flex">
              <p>Release:</p>
              <p v-if="result.release_date">
                {{ setDate(result.release_date) }}
              </p>
              <p v-else>n/a</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- show link to trailer, if movie has a trailer -->
    <div v-if="result && videos.length !== 0" class="trailer-wrapper wrapper">
      <h2 class="heading">Watch trailer</h2>
      <div class="trailer-card">
        <div class="filter"></div>
        <img
          :src="
            result.backdrop_path ? setBackdropPath(result.backdrop_path) : ''
          "
          :alt="result.title"
          class="backdrop"
        />
        <img
          src="../../assets/video-placeholder.png"
          alt="placeholder image"
          class="backdrop-placeholder"
        />
        <a
          :href="`https://youtu.be/${trailerLink.key}`"
          target="_blank"
          :title="`Watch ${result.title} Trailer on YouTube`"
        >
          <img
            src="../../assets/play-icon.svg"
            width="50"
            height="50"
            alt="play icon"
            class="play-icon"
          />
        </a>
      </div>
    </div>

    <!-- load similar movies after the movie information is shown -->
    <SimilarMovies
      :movie-id="movieId"
      :is-loaded="isLoaded"
      @send-id="getNewMovieId"
    />
  </div>

  <!-- if we're loading, show the content placeholders -->
  <div v-else>
    <InfoPlaceholder />
    <ContentPlaceholder />
  </div>
</template>

<script>
import apiKey from "../../../config.js";
import SimilarMovies from "./SimilarMovies.vue";
import InfoPlaceholder from "../ui/InfoPlaceholder.vue";
import ContentPlaceholder from "../ui/ContentPlaceholder.vue";

export default {
  name: "MovieInfo",
  components: {
    SimilarMovies,
    InfoPlaceholder,
    ContentPlaceholder,
  },
  props: ["chosen-category"],
  emits: [
    "show-button",
    "activated-side",
    "update-category",
    "connection-error",
    "error404",
  ],
  inject: [
    "setPath",
    "setBackdropPath",
    "setDate",
    "setTime",
    "scrollToTop",
    "setTrailerLink",
  ],
  data() {
    return {
      result: null,
      isLoaded: false,
      videos: [],
      trailerLink: [],
      movieId: null,
      isLoading: false,
      idFromSearch: null,
    };
  },
  methods: {
    async getMovies(id) {
      this.scrollToTop();
      try {
        this.isLoaded = false;
        this.isLoading = true;
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

        // fetch data
        const response = await fetch(url);
        const data = await response.json();

        this.result = data;
        this.isLoaded = true;
        this.isLoading = false;
        this.$emit("connection-error", false);
      } catch (error) {
        this.$emit("connection-error", true);
      }
    },
    async getVideos(id) {
      const videos_url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

      // fetch data
      const response = await fetch(videos_url);
      const data = await response.json();
      this.videos = data.results;

      // call the setTrailerLink method if there are results
      if (this.videos.length > 0) {
        const availableLinks = this.setTrailerLink(this.videos);
        // only use 1 trailer if there is more than 1 available
        this.trailerLink = availableLinks[0];
      } else {
        this.videos = [];
      }
    },
    getNewMovieId(id) {
      this.movieId = id;
    },
  },
  watch: {
    movieId(newValue) {
      // call the getMovies() method to fetch movies when the movieId prop has a value
      if (newValue) {
        this.getMovies(newValue);
        this.getVideos(newValue);
      }
    },
    idFromSearch(newValue) {
      // watch the id gotten from mini search and fetch movies if it has a value
      if (newValue) {
        this.getMovies(newValue);
        this.getVideos(newValue);
        // set the value of the movie id data prop to be the value of the id from search
        this.movieId = newValue;
      }
    },
  },
  beforeMount() {
    // get the movie Id from the query parameter before the movie is displayed onscreen
    this.movieId = +this.$route.query.id;
    // emit a custom event that sets active styling on the header links
    this.$emit("activated-side", "movies");
    // emit a custom event to carry the chosenCategory prop to remove Vue warnings
    this.$emit("update-category", this.chosenCategory);
    // emit this custom event to remove vue warnings
    this.$emit("error404", false);
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
  border-radius: 10px;
}

.content-poster > img {
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

/* .content-poster img.no-poster-img {
  padding: 7.5rem 1.25rem;
  object-fit: cover;
} */

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

.trailer-wrapper .trailer-card {
  max-width: 37.5rem;
  max-height: 21.875rem;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
    max-width: 180px;
    max-height: 270px;
    margin: 0 auto;
    grid-column: span 1;
    grid-row: 1/2;
  }

  .info-wrapper .content-poster img {
    max-width: 100%;
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
  .meta .meta-section-1 {
    gap: 1rem;
  }

  .meta .meta-section-3 .spaced > p:first-child {
    width: fit-content;
    margin-right: 1rem;
  }

  .trailer-wrapper .trailer-card img.play-icon {
    visibility: visible;
    opacity: 1;
  }

  /* .content-poster img.no-poster-img {
    padding: 5.5rem 1.25rem;
  } */
}
</style>