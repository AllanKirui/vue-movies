<template>
  <div class="search-container">
    <!-- <form class="search-form" @submit.prevent="getMovies(searchLink)"> -->
    <form class="search-form">
      <label for="search">Search</label>
      <input
        name="search"
        type="text"
        placeholder="Search for movies or TV shows..."
      />
      <button title="search" class="search-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 5.5562499 5.5562502"
        >
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
  </div>

  <div class="results-container">
    <h1 class="search-term">
      Showing results for: <span class="text-white">without</span>
    </h1>
    <ul class="content-wrapper">
      <li class="content"></li>
      <li class="content"></li>
      <li class="content"></li>
      <li class="content"></li>
      <li class="content"></li>
    </ul>
  </div>
</template>