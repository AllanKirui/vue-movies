<template>
  <!-- show the backdrop image if it is available -->
  <div
    v-if="result"
    class="info-wrapper"
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
        alt=""
        width="320"
      />
      <img
        v-else
        src="../assets/no-poster-img.svg"
        width="200"
        alt=""
        class="no-poster-img"
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
        <div class="meta-section-1 flex">
          <p class="content-rating">
            <img
              src="../assets/rating-icon.svg"
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
            class="content-country flex"
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
          <div v-else class="content-country flex">
            <p>Countries:</p>
            <p>n/a</p>
          </div>
          <!-- movie genre -->
          <div v-if="result.genres.length > 0" class="content-genre flex">
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
          <div v-else class="content-genre flex">
            <p>Genres:</p>
            <p>n/a</p>
          </div>
          <!-- movie release date -->
          <div class="content-release flex">
            <p>Release:</p>
            <p v-if="result.release_date">{{ setDate(result.release_date) }}</p>
            <p v-else>n/a</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- show link to trailer, if movie has a trailer -->
  <div v-if="result && videos.length !== 0" class="trailer-wrapper">
    <h2 class="heading">Watch trailer</h2>
    <div class="trailer-card">
      <div class="filter"></div>
      <img
        :src="result.backdrop_path ? setBackdropPath(result.backdrop_path) : ''"
        :alt="result.title"
        class="backdrop"
      />
      <a
        :href="`https://youtu.be/${trailerLink.key}`"
        target="_blank"
        :title="`Watch ${result.title} Trailer on YouTube`"
      >
        <img
          src="../assets/play-icon.svg"
          width="50"
          height="50"
          alt="play icon"
          class="play-icon"
        />
      </a>
    </div>
  </div>

  <!-- load similar movies -->
  <SimilarMovies
    :movie-id="movieId"
    :set-date="setDate"
    @send-id="sendMovieId"
  />
</template>

<script>
import apiKey from "../../config.js";
import SimilarMovies from "./SimilarMovies.vue";
const imgPath = "https://image.tmdb.org/t/p/w500";
const backdropImgPath = "https://image.tmdb.org/t/p/w1280";

export default {
  components: {
    SimilarMovies,
  },
  props: ["movieId", "setDate", "setTime"],
  emits: ["send-id", "set-status"],
  data() {
    return {
      result: null,
      videos: [],
      trailerLink: [],
    };
  },
  methods: {
    setPath(poster_path) {
      return imgPath + poster_path;
    },
    setBackdropPath(backdrop_path) {
      return backdropImgPath + backdrop_path;
    },
    async getMovies(id) {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      this.result = data;
      this.$emit("set-status", "MovieInfoLoaded");
    },
    async getVideos(id) {
      const videos_url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

      // fetch data
      const response = await fetch(videos_url);
      const data = await response.json();
      this.videos = data.results;

      // call the setTrailerLink method if there are results
      if (this.videos.length > 0) {
        this.setTrailerLink(this.videos);
      } else {
        this.videos = [];
      }
    },
    setTrailerLink(videoLinks) {
      const links = [];
      // loop through the available links
      for (const link of videoLinks) {
        // check if the video is of type Trailer
        if (link.type.toLowerCase() === "trailer") {
          // split the name property
          const nameArray = link.name.toLowerCase().split(" ");
          // check if it contains the string Official or Final or Trailer
          if (
            nameArray.indexOf("official") !== -1 ||
            nameArray.indexOf("final") !== -1 ||
            nameArray.indexOf("trailer") !== -1
          ) {
            // check if the trailer source is YouTube
            if (link.site.toLowerCase() !== "youtube") return;
            // add the link to the links array
            links.push(link);
          }
        }
      }
      // only use 1 trailer if there is more than 1 available
      if (links.length > 1) {
        this.trailerLink = links[0];
      } else {
        this.trailerLink = links[0];
      }
    },
    sendMovieId(id) {
      this.$emit("send-id", id);
    },
  },
  watch: {
    movieId(newValue) {
      // call the getMovies() method to fetch movies when the movieId prop has a value
      if (newValue) {
        this.$emit("set-status", "MovieInfoLoading");
        this.getMovies(newValue);
        this.getVideos(newValue);
      } else {
        // reset data properties
        this.result = null;
        this.videos = [];
      }
    },
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
}

.content-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
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
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease-in-out;
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

@media screen and (max-width: 576px) {
  .trailer-wrapper .trailer-card img.play-icon {
    visibility: visible;
    opacity: 1;
  }
}
</style>