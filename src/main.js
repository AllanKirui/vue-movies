import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import TheMovies from "./components/movies/TheMovies.vue";
import TheShows from "./components/tv/TheShows.vue";
import MovieInfo from "./components/movies/MovieInfo.vue";
import ExpandedMoviesearch from "./components/search/ExpandedMoviesearch.vue";
import ExpandedTvsearch from "./components/search/ExpandedTvsearch.vue";
import ShowInfo from "./components/tv/ShowInfo.vue";
import NotFound from "./components/ui/NotFound.vue";

const setRedirectPath = () => {
  // get stored app states from local storage
  const retrievedState = JSON.parse(localStorage.getItem("appState"));
  // if there's no stored app states, return movies as the path to use
  if (!retrievedState) return "/vue-movies/movies";
  // otherwise use the stored app states
  const retrievedPath = retrievedState.lastActiveSide;
  return retrievedPath ? "/vue-movies/" + retrievedPath : "/vue-movies/movies";
};

// create the router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: setRedirectPath },
    { path: "/vue-movies/", redirect: setRedirectPath },
    { path: "/vue-movies/movies", component: TheMovies },
    { path: "/vue-movies/shows", component: TheShows },
    { path: "/vue-movies/movies/info", component: MovieInfo },
    { path: "/vue-movies/movies/search", component: ExpandedMoviesearch },
    { path: "/vue-movies/shows/info", component: ShowInfo },
    { path: "/vue-movies/shows/search", component: ExpandedTvsearch },
    { path: "/vue-movies/:notFound(.*)", component: NotFound },
  ],
});

const app = createApp(App);

// tell Vue to use the created router
app.use(router);

app.mount("#app");
