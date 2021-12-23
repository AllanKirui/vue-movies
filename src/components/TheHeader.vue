<template>
  <nav>
    <button class="burger">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="logo">
      <h1>VueMovies</h1>
    </div>

    <ul class="nav-options">
      <li><a href="#">Movies</a></li>
      <li><a href="#">TV Shows</a></li>
    </ul>

    <!-- Import the SearchHandler component here -->
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  height: 80px;
  background-color: var(--color-jet-black);
}

.logo h1 {
  font-size: var(--font-size-24);
}

.nav-options {
  list-style: none;
}

.logo h1,
.nav-options a {
  color: var(--color-clouds);
}
</style>