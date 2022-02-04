<template>
  <TheHeader
    :remove-search="isRemoveSearchResults"
    @no-scroll="setScrollBehaviour"
    @find-searchterm="showMoreResults"
    @remove-results="removeSearchResults"
    @send-id="showMovieInfo"
    @search-status="resetRemoveSearch"
  />

  <div class="expanded-search-wrapper flex flex-fd-c">
    <ExpandedSearch
      v-if="isShowMoreResults"
      :set-date="setDateFormat"
      :page-num="selectedPage"
      :search-this="keyword"
      @total-pages="setTotalPages"
      @set-status="setLoadingStatus"
      @reset-pages="resetPages"
      @send-id="showMovieInfo"
    />
    <ContentPlaceholder v-if="isLoading" />

    <ThePagination
      v-if="totalPages && !isLoading"
      :received-pages="totalPages"
      :chosen-page="selectedPage"
      @switch-page="switchPages"
    />
  </div>

  <MovieInfo
    :movie-id="movieId"
    :set-date="setDateFormat"
    :set-time="setTimeFormat"
    @send-id="showMovieInfo"
  />
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import ExpandedSearch from "./components/ExpandedSearch.vue";
import ContentPlaceholder from "./components/ContentPlaceholder.vue";
import ThePagination from "./components/ThePagination.vue";
import MovieInfo from "./components/MovieInfo.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    ExpandedSearch,
    ContentPlaceholder,
    ThePagination,
    MovieInfo,
  },
  data() {
    return {
      isLoading: false,
      totalPages: null,
      activePage: null,
      selectedPage: 1, // the default page is 1
      isShowMoreResults: false,
      keyword: "",
      movieId: null,
      isRemoveSearchResults: false,
    };
  },
  methods: {
    setDateFormat(dateString) {
      if (!dateString) return;
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const date = dateString.split("-");
      const year = date[0];
      const monthIdx = parseInt(date[1]) - 1;
      const day = date[2];
      const stringMonth = months.find((month) => month === months[monthIdx]);
      return `${day} ${stringMonth} ${year}`;
    },
    setTimeFormat(runtime) {
      const time = parseInt(runtime);
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      if (hours === 0) return `${minutes}min`;
      if (minutes < 10) return `${hours}h 0${minutes}min`;
      return `${hours}h ${minutes}min`;
    },
    setLoadingStatus(status) {
      this.isLoading = status;
    },
    setTotalPages(pages, selectedPage) {
      this.totalPages = pages;
      this.activePage = selectedPage;
    },
    switchPages(pageNum) {
      this.selectedPage = pageNum;
    },
    resetPages() {
      this.selectedPage = 1;
    },
    scrollToTop() {
      // scroll to top when a new page is fetched
      window.scrollTo(0, 0);
    },
    setScrollBehaviour() {
      document.body.classList.toggle("no-scroll");
    },
    showMoreResults(keyword) {
      // reset movieId
      this.movieId = null;
      this.isShowMoreResults = true;
      this.keyword = keyword;
    },
    removeSearchResults() {
      this.isShowMoreResults = false;
      this.totalPages = null;
    },
    showMovieInfo(id) {
      this.isRemoveSearchResults = true;
      this.movieId = id;
    },
    resetRemoveSearch(status) {
      this.isRemoveSearchResults = status;
    },
  },
  watch: {
    selectedPage() {
      // when the selectedPage data property changes, call the scrollToTop method
      this.scrollToTop();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400&display=swap");

:root {
  /* Colors */
  --color-clouds: #ececec;
  --color-smokey-black: #111111;
  --color-jet-black: #090909;
  --color-white: #ffffff;
  --color-black-blue: #212429;
  --color-charleston-green: #272727;
  --color-spanish-gray: #999999;
  --color-silver-chalice: #b0b0b0;

  /* Font sizes */
  --font-size-16: 1rem;
  --font-size-18: 1.125rem;
  --font-size-20: 1.25rem;
  --font-size-22: 1.375rem;
  --font-size-24: 1.5rem;
  --font-size-28: 1.75rem;
  --font-size-40: 2.5rem;
}

html {
  font-size: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  font-family: "PT Sans", sans-serif;
  background-color: var(--color-smokey-black);
}

h1,
h2,
h3,
p {
  margin: 0;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Flex box styles */
.flex {
  display: flex;
}

.flex-fd-c {
  flex-direction: column;
}

.flex-jc-c {
  justify-content: center;
}

.flex-jc-sb {
  justify-content: space-between;
}

.flex-ai-c {
  align-items: center;
}

.flex-fw-w {
  flex-wrap: wrap;
}

.wrapper {
  /* max-width: 83.125rem; 1330px */
  max-width: 87.5rem; /* 1400px */
}

.text-white {
  color: var(--color-white);
}

.no-scroll {
  overflow: hidden;
}

.overlay.active-overlay {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: rgba(9, 9, 9, 0.5);
  backdrop-filter: blur(10px);
  cursor: pointer;
  z-index: 2;
}

/* start of scrollbar styles */
html::-webkit-scrollbar,
.results-wrapper::-webkit-scrollbar {
  width: 1vw;
}

html::-webkit-scrollbar-thumb,
.results-wrapper::-webkit-scrollbar-thumb {
  background-color: var(--color-clouds);
}

html::-webkit-scrollbar-track,
.results-wrapper::-webkit-scrollbar-track {
  background-color: var(--color-charleston-green);
}
/* end of scrollbar styles */

/* start of global placeholder styles */
.animated-bg {
  background-image: linear-gradient(
    to right,
    #1a1a1a 0%,
    #272727 10%,
    #1a1a1a 15%,
    #1a1a1a 100%
  );
  background-size: 200% 100%;
  animation: bgPos 1.2s linear infinite;
}

.animated-bg-text {
  border-radius: 50px;
  display: inline-block;
  margin: 0;
  height: 0.75rem;
  width: 100%;
}

@keyframes bgPos {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -150% 0;
  }
}
/* end of global placeholder styles */

/* start of movie card styles*/
.results-container {
  width: 100%;
  padding-right: 0.9375rem;
  padding-left: 0.9375rem;
  margin-right: auto;
  margin-left: auto;
}

.content-wrapper .content {
  width: 23.5%;
  height: 29.6875rem;
  margin: 0 0.4%;
  float: left;
  display: block;
  position: relative;
  cursor: pointer;
}

.placeholder__poster,
.content__poster {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: var(--color-jet-black);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  overflow: hidden;
}

.content__poster img {
  transition: transform 0.2s ease-in-out;
}

.content__poster:hover img {
  transform: scale(1.025);
}

.content__poster img.no-poster-img {
  transition: none;
  transform: none;
}

.poster-height {
  height: 85%;
}

.placeholder__poster {
  height: 80%;
}

.content__poster img {
  width: 100%;
  height: 100%;
  max-height: 23.75rem;
  object-fit: cover;
}

.content .tag {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0.125rem 0.5rem;
  border-radius: 0 10px 0 0;
  background-color: var(--color-smokey-black);
  color: var(--color-white);
}

.content__info-title {
  margin-bottom: 0.4375rem;
  font-size: var(--font-size-20);
  color: var(--color-white);
}

.content__info .meta {
  font-size: var(--font-size-18);
  color: var(--color-clouds);
}

.content__info img {
  margin-right: 0.1875rem;
}
/* end of movie card styles */

/* start of pagination styles */
#pagination-wrapper {
  margin: 0 auto 100px;
  transition: all 0.3s ease-in-out;
}

.page-btn {
  position: relative;
  min-width: 3.125rem;
  min-height: 2.8125rem;
  border: none;
  outline: none;
  border-radius: 5px;
  font-family: inherit;
  font-size: var(--font-size-18);
  background-color: var(--color-black-blue);
  color: var(--color-silver-chalice);
  cursor: pointer;
  overflow: hidden;
}

.page-btn.active::before,
.page-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  transform: skewX(-30deg);
  transition: left 0.75s;
  z-index: -1;
}

.page-btn::before {
  background: linear-gradient(
    to right,
    transparent,
    transparent,
    var(--color-clouds),
    transparent,
    transparent
  );
}

.page-btn.active::before {
  background: linear-gradient(
    to right,
    transparent,
    transparent,
    var(--color-jet-black),
    transparent,
    transparent
  );
}

.page-btn:hover::before {
  left: 100%;
  z-index: 1;
}

.page-btn:not(:last-child) {
  margin-right: 0.5rem;
}

.page-btn.active {
  background-color: var(--color-clouds);
  color: var(--color-smokey-black);
}
/* end of pagination styles */

@media screen and (max-width: 1439px) {
  .content-wrapper {
    margin: 0 -0.5%;
  }

  .content-wrapper .content {
    width: 19%;
    margin: 0 0.5%;
  }
}

@media screen and (max-width: 1279px) {
  .content-wrapper {
    margin: 0 -0.5%;
  }

  .content-wrapper .content {
    width: 19%;
    height: 26.875rem;
    margin: 0 0.5%;
  }

  .content__info-title {
    font-size: var(--font-size-18);
  }

  .content__info .meta {
    font-size: var(--font-size-16);
  }
}

@media screen and (max-width: 1139px) {
  .content-wrapper .content {
    height: 24.375rem;
  }
}

@media screen and (max-width: 1023px) {
  .content-wrapper .content {
    height: 22.5rem;
    margin-bottom: 0px !important;
  }
}

@media screen and (max-width: 768px) {
  .content-wrapper {
    margin: 0 -0.75%;
  }

  .content-wrapper .content {
    width: 31.3333333333%;
    margin: 0 0.75%;
    margin-bottom: 4.375rem !important;
  }
}

@media screen and (max-width: 719px) {
  .content-wrapper .content {
    margin-bottom: 2.5rem !important;
  }
}

@media screen and (max-width: 576px) {
  .content-wrapper {
    margin: 0 -1%;
  }

  .content-wrapper .content {
    width: 47%;
    margin: 0 1%;
    margin-bottom: 6.25rem !important;
  }
}

@media screen and (max-width: 519px) {
  .content-wrapper .content {
    margin-bottom: 3.4375rem !important;
  }
}

@media screen and (max-width: 480px) {
  .content-wrapper {
    margin: 0 -1.5%;
  }

  .content-wrapper .content {
    width: 47%;
    margin: 0 1.5%;
    margin-bottom: 1.875rem !important;
  }
}

@media screen and (max-width: 419px) {
  .content-wrapper .content {
    margin-bottom: 0.625rem !important;
  }
}
/* end of movie card styles*/
</style>