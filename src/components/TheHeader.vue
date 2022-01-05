<template>
  <nav class="flex flex-ai-c">
    <button
      :class="[isMenuOpen ? 'open' : '', 'burger']"
      @click="setActiveStatus"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="logo">
      <img src="../assets/logo.svg" width="191" height="71" />
    </div>

    <ul class="nav-options flex">
      <li><a href="#">Movies</a></li>
      <li><a href="#">TV Shows</a></li>
    </ul>

    <form class="search-form" @submit.prevent="getMovies(searchLink)">
      <label for="search">Search</label>
      <input
        name="search"
        type="text"
        placeholder="Search for movies or TV shows..."
        v-model.trim="searchTerm"
        :class="searchTerm ? 'active-search' : ''"
      />
      <button title="search" class="search-btn">
        <!-- <img src="../assets/search-icon.svg" alt="search icon" /> -->
        <svg
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          width="21"
          height="21"
          viewBox="0 0 5.5562499 5.5562502"
          version="1.1"
          id="svg1839"
          inkscape:version="1.0.2 (e86c870879, 2021-01-15, custom)"
          sodipodi:docname="search-icon.svg"
        >
          <defs id="defs1833" />
          <sodipodi:namedview
            id="base"
            pagecolor="#ffffff"
            bordercolor="#666666"
            borderopacity="1.0"
            inkscape:pageopacity="0.0"
            inkscape:pageshadow="2"
            inkscape:zoom="7.9195959"
            inkscape:cx="4.2522744"
            inkscape:cy="21.326222"
            inkscape:document-units="px"
            inkscape:current-layer="layer1"
            inkscape:document-rotation="0"
            showgrid="false"
            units="px"
            inkscape:window-width="1267"
            inkscape:window-height="728"
            inkscape:window-x="83"
            inkscape:window-y="0"
            inkscape:window-maximized="0"
          />
          <metadata id="metadata1836">
            <rdf:RDF>
              <cc:Work rdf:about="">
                <dc:format>image/svg+xml</dc:format>
                <dc:type
                  rdf:resource="http://purl.org/dc/dcmitype/StillImage"
                />
                <dc:title></dc:title>
              </cc:Work>
            </rdf:RDF>
          </metadata>
          <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1">
            <g
              id="g2499"
              transform="matrix(0.99256808,0,0,0.99256808,-633.03941,-286.23689)"
              style="display: inline; stroke: #090909; stroke-opacity: 1"
            >
              <circle
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #090909;
                  stroke-width: 0.40755;
                  stroke-opacity: 1;
                "
                id="circle2495"
                cx="640.03369"
                cy="290.65128"
                r="2.0451832"
              />
              <path
                style="
                  fill: none;
                  stroke: #090909;
                  stroke-width: 0.396875;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-opacity: 1;
                "
                d="m 641.51906,292.13667 1.72321,1.7232"
                id="path2497"
              />
            </g>
          </g>
        </svg>
      </button>
    </form>

    <!-- Import the SearchHandler component here -->
    <search-handler></search-handler>
  </nav>
</template>

<script>
import apiKey from "../../config.js";
import SearchHandler from "./SearchHandler.vue";
const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query="`;

export default {
  components: {
    "search-handler": SearchHandler,
  },
  data() {
    return {
      isMenuOpen: false,
      searchTerm: "",
      searchLink: searchAPI,
      searchResults: null,
    };
  },
  methods: {
    setActiveStatus() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async getMovies(url) {
      if (this.searchTerm === "") {
        // show no results, change routes
        window.location.reload();
        console.log("blank entered");
        return;
      }
      // fetch(url + this.searchTerm)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log(data);
      //   });
      const response = await fetch(url + this.searchTerm);
      const data = await response.json();
      console.log(data.results);
      this.searchResults = data.results;
    },
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 5rem;
  background-color: var(--color-jet-black);
}

.burger {
  background-color: transparent;
  width: 24px;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 2;
  margin-right: 30px;
}

.burger span {
  display: block;
  position: relative;
  top: 0;
  width: 24px;
  height: 3px;
  background-color: var(--color-clouds);
  margin-bottom: 5px;
  transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width,
    0.3s ease right;
  border-radius: 2px;
}

.burger span:first-child {
  transform-origin: 0;
}

.burger span:last-child {
  margin-bottom: 0;
  transform-origin: 24px;
}

.burger.open span:first-child {
  top: -2px;
  transform: rotateZ(45deg);
}

.burger.open span:last-child {
  top: 6px;
  transform: rotateZ(45deg);
}

.burger.open span:nth-child(2) {
  width: 38px;
  top: 2px;
  right: 7px;
  transform: rotateZ(-45deg);
}

.nav-options {
  list-style: none;
  padding: 0;
}

.nav-options a {
  font-size: var(--font-size-18);
  font-weight: bold;
  color: var(--color-clouds);
}

.nav-options li:not(:last-child),
.logo {
  margin-right: 2.5rem;
}

.search-form {
  position: absolute;
  right: 1.875rem;
}

.search-form label {
  display: none;
}

.search-form input {
  width: 25rem;
  max-width: 100%;
  padding: 0.875rem 3.4375rem 0.875rem 1.375rem;
  border-radius: 50px;
  outline: none;
  border: 1px solid var(--color-clouds);
  background: var(--color-jet-black);
  font-family: "PT Sans", sans-serif;
  font-size: var(--font-size-16);
}

.search-form input,
.search-form input::placeholder {
  color: var(--color-clouds);
}

.search-form input.active-search,
.search-form input:focus {
  background-color: var(--color-clouds);
  color: var(--color-jet-black);
}

.search-btn {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
}

.search-btn svg circle,
.search-btn svg path {
  stroke: var(--color-clouds) !important;
  transition: stroke 0.2s ease-in-out;
}

.search-form input:focus + .search-btn svg circle,
.search-form input:focus + .search-btn svg path,
.search-form input.active-search + .search-btn svg circle,
.search-form input.active-search + .search-btn svg path {
  stroke: var(--color-jet-black) !important;
}
</style>