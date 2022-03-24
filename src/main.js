import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import TheMovies from "./components/TheMovies.vue";
import TheShows from "./components/TheShows.vue";
import MovieInfo from "./components/movies/MovieInfo.vue";
import ExpandedSearch from "./components/search/ExpandedSearch.vue";
import ShowInfo from "./components/tv/ShowInfo.vue";

// create the router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/movies", component: TheMovies },
    { path: "/shows", component: TheShows },
    { path: "/movies/info", component: MovieInfo },
    { path: "/movies/search", component: ExpandedSearch },
    { path: "/shows/info", component: ShowInfo },
    { path: "/shows/search", component: ExpandedSearch },
  ],
});

const app = createApp(App);

// tell Vue to use the created router
app.use(router);

app.mount("#app");
