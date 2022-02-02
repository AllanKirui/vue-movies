<template>
  <div v-if="result" class="info-wrapper">
    <div class="content-poster">
      <img
        :src="setPath(result.poster_path)"
        :title="result.title"
        alt=""
        width="320"
      />
    </div>
    <div class="content-text">
      <h1 class="content-title">{{ result.title }}</h1>

      <div class="meta">
        <div class="meta-section-1 flex">
          <p class="content-rating">
            <img
              src="../assets/rating-icon.svg"
              width="15"
              height="14.4"
              alt="star icon"
            />{{ result.vote_average }}
          </p>
          <p class="content-runtime">{{ result.runtime }}</p>
        </div>

        <div class="meta-section-2">
          <p class="content-overview">{{ result.overview }}</p>
        </div>

        <div class="meta-section-3 flex flex-fd-c">
          <div class="content-country flex">
            <p>Country:</p>
            <div
              v-for="country in result.production_countries"
              :key="country.name"
            >
              <p>{{ country.name }}</p>
            </div>
          </div>

          <div class="content-genre flex">
            <p>Genres:</p>
            <div v-for="genre in result.genres" :key="genre.id">
              <p>{{ genre.name }}</p>
            </div>
          </div>

          <div class="content-release flex">
            <p>Release:</p>
            <p>{{ setDate(result.release_date) }}</p>
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
  props: ["movieId", "setDate"],
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
  background-color: tomato;
}

.content-poster {
  grid-column: 1/2;
  width: fit-content;
  height: fit-content;
}

.content-poster img {
  object-fit: cover;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.content-text {
  background-color: rgb(33, 63, 88);
  grid-column: 2/3;
}

.content-title {
  margin-top: 1.375rem;
  margin-bottom: 1.125rem;
  color: var(--color-white);
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

.meta .meta-section-3 .title-field p,
.meta .meta-section-3 .value-field div {
  margin-bottom: 0.3125rem;
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
</style>