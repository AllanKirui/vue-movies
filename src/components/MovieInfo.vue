<template>
  <!-- show the backdrop image if it is available -->
  <div
    v-if="result"
    class="info-wrapper"
    :style="
      result.backdrop_path
        ? {
            background: `url(` + setPath(result.backdrop_path) + `)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }
        : ''
    "
  >
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
            <p>Country:</p>
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
</template>

<script>
import apiKey from "../../config.js";
const imgPath = "https://image.tmdb.org/t/p/w1280";

export default {
  props: ["movieId", "setDate", "setTime"],
  data() {
    return {
      result: null,
    };
  },
  methods: {
    setPath(poster_path) {
      return imgPath + poster_path;
    },
    async getMovies(id) {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      this.result = data;
      console.log(this.result);
    },
  },
  watch: {
    movieId(newValue) {
      // call the getMovies() method to fetch movies when the movieId prop has a value
      if (newValue) {
        this.getMovies(newValue);
      }
    },
  },
};
</script>

<style scoped>
.info-wrapper {
  display: grid;
  gap: 3.125rem;
  grid-template-columns: 20rem auto;
  padding: 2.1875rem 0.9375rem;
  position: relative;
}

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
</style>