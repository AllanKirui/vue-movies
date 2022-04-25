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
  if (!retrievedState) return "movies";
  // otherwise use the stored app states
  const retrievedPath = retrievedState.lastActiveSide;
  return retrievedPath ? retrievedPath : "movies";
};

// create the router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: setRedirectPath },
    { path: "/movies", component: TheMovies },
    { path: "/shows", component: TheShows },
    { path: "/movies/info", component: MovieInfo },
    { path: "/movies/search", component: ExpandedMoviesearch },
    { path: "/shows/info", component: ShowInfo },
    { path: "/shows/search", component: ExpandedTvsearch },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

const app = createApp(App);

// tell Vue to use the created router
app.use(router);

app.mount("#app");
