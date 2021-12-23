<style>
/* Import styles here */
:root {
  /* Colors */
  --color-clouds: #ececec;
  --color-smokey-black: #111111;
  --color-jet-black: #090909;

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
</style>