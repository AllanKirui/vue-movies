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

    <!-- Import the SearchHandler component here -->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    setActiveStatus() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 80px;
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
</style>