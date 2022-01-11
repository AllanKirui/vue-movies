<template>
  <div :class="[isSearchActive ? 'active' : '', 'results-wrapper']">
    <ul v-for="result in results" :key="result.id">
      <li class="result flex">
        <div class="result__poster">
          <img
            v-if="result.poster_path"
            :src="setPath(result.poster_path)"
            alt=""
          />
          <img
            v-else
            src="../assets/no-poster-img.svg"
            width="70"
            height="35.3"
            alt=""
            class="no-poster-img"
          />
        </div>
        <div class="result__info flex flex-fd-c">
          <h3 class="result__info-title">{{ result.title }}</h3>
          <p v-if="result.overview" class="result__info-overview">
            {{ adjustOverviewLength(result.overview) }}
          </p>
          <p v-else class="result__info-overview">n/a</p>
          <div class="flex">
            <p v-if="result.release_date" class="result__info-date">
              {{ result.release_date }}
            </p>
            <p v-else class="result__info-date">n/a</p>
            <p class="result__info-rating flex flex-ai-c">
              <img
                src="../assets/rating-icon.svg"
                width="15"
                height="14.4"
                alt="star icon"
              />{{ result.vote_average }}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <button v-if="isMoreResults" class="view-more-btn">
      View More Results
    </button>
  </div>
</template>

<script>
const imgPath = "https://image.tmdb.org/t/p/w1280";

export default {
  props: ["searchResults"],
  name: "SearchHandler",
  data() {
    return {
      isSearchActive: this.searchResults[0],
      results: this.searchResults[1],
      isMoreResults: this.searchResults[2],
    };
  },
  methods: {
    setPath(poster_path) {
      return imgPath + poster_path;
    },
    adjustOverviewLength(overview) {
      if (overview.length <= 150) {
        return overview;
      }

      let shortOverview = "";
      for (let i = 0; i <= 150; i++) {
        shortOverview += overview[i];
      }
      return shortOverview + "...";
    },
  },
};
</script>

<style scoped>
.result__poster img,
.result__poster img.no-poster-img {
  width: 100%;
  height: 100%;
}

.result__poster img {
  object-fit: cover;
}

.result__poster img.no-poster-img {
  object-fit: contain;
}

.result__info {
  color: var(--color-white);
  width: 100%;
}

.result__info > div {
  position: absolute;
  bottom: 8px;
  gap: 15px;
}
.result__info > div p > img {
  margin-right: 3px;
}

.result__info-date,
.result__info-rating {
  color: var(--color-clouds);
}

.result__info-title {
  font-size: var(--font-size-18);
}

.result__info-overview {
  font-size: var(--font-size-16);
  margin-bottom: 0.625rem;
}

.view-more-btn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 1.25rem;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
  font-family: inherit;
  font-size: var(--font-size-16);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.view-more-btn:hover {
  color: var(--color-smokey-black);
  background-color: var(--color-clouds);
}
</style>