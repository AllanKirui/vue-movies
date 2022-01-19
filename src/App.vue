<template>
  <TheHeader />
  <ExpandedSearch />
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import ExpandedSearch from "./components/ExpandedSearch.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    ExpandedSearch,
  },
};
</script>

<style>
/* Import styles here */
:root {
  /* Colors */
  --color-clouds: #ececec;
  --color-smokey-black: #111111;
  --color-jet-black: #090909;
  --color-white: #ffffff;
  --color-black-blue: #212429;
  --color-charleston-green: #272727;

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

.overlay.active-overlay {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: rgba(9, 9, 9, 0.2);
  backdrop-filter: blur(10px);
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
</style>