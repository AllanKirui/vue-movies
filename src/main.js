import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import TheMovies from "./components/TheMovies.vue";
import TheShows from "./components/TheShows.vue";
import MovieInfo from "./components/movies/MovieInfo.vue";
import ExpandedMoviesearch from "./components/search/ExpandedMoviesearch.vue";
import ExpandedTvsearch from "./components/search/ExpandedTvsearch.vue";
import ShowInfo from "./components/tv/ShowInfo.vue";

// create the router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/movies" },
    { path: "/movies", component: TheMovies },
    { path: "/shows", component: TheShows },
    { path: "/movies/info", component: MovieInfo },
    { path: "/movies/search", component: ExpandedMoviesearch },
    { path: "/shows/info", component: ShowInfo },
    { path: "/shows/search", component: ExpandedTvsearch },
  ],
});

const app = createApp(App);

// tell Vue to use the created router
app.use(router);

app.mount("#app");
