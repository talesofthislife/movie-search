<script setup>
import { ref } from 'vue';

// TODO: Add Styling
// TODO: Close Other Dropdowns When One is Open:
// TODO: Close Dropdown on Outside Click:

// Reactive state to track dropdown visibility
const isMoviesDropdownOpen = ref(false);
const isSeriesDropdownOpen = ref(false);

// Toggles the dropdown visibility
const toggleMoviesDropdown = (event) => {
    event.preventDefault(); // do not navigate
    isMoviesDropdownOpen.value = !isMoviesDropdownOpen.value;
};
const toggleSeriesDropdown = (event) => {
    event.preventDefault(); // do not navigate
    isSeriesDropdownOpen.value = !isSeriesDropdownOpen.value;
};

</script>

<template>
    <header class="bg-orange-500">
        <nav class="py-3.5 container mx-auto">
          <ul class="flex justify-start gap-x-8">
            <li>
              <a href="/" aria-label="Home">
                <img src="/vite.svg" alt="Find a Movie or Series" class="w-28 max-h-6">
              </a>
            </li>
            <li><router-link to="/" class="">Home</router-link></li>
                <li class="relative">
                     <!-- Movies Dropdown with ARIA (accessibility) attributes -->
                    <button  aria-haspopup="true" v-bind:aria-expanded="isMoviesDropdownOpen" v-on:click="toggleMoviesDropdown" class="">Movies</button>
                    
                    <!-- Submenu displays only if isDropdownOpen is true  -->
                    <ul v-if="isMoviesDropdownOpen" class="absolute bg-orange-50 min-w-[150px] text-left text-sm rounded-md">
                        <li>
                          <router-link to="/movies/popular" class="block px-1 py-2">
                            Popular Movies
                          </router-link>
                        </li>
                        <li>
                          <router-link to="/movies/top-rated" class="block px-1 py-2">
                            Top Rated Movies
                          </router-link>
                        </li>
                    </ul>
                </li>
                <li class="relative">
                     <!-- Movies Dropdown with ARIA (accessibility) attributes -->
                     <button  aria-haspopup="true" v-bind:aria-expanded="isSeriesDropdownOpen" v-on:click="toggleSeriesDropdown" class="">TV Series</button>
                    <!-- Submenu displays only if isDropdownOpen is true  -->
                    <ul v-if="isSeriesDropdownOpen" class="absolute bg-orange-50 min-w-[150px] text-left text-sm rounded-md">
                        <li>
                          <router-link to="/tv-series/popular" class="block px-1 py-2">
                            Popular TV Series
                          </router-link>
                        </li>
                        <li>
                          <router-link to="/tv-series/top-rated" class="block px-1 py-2">
                            Top Rated TV Series
                          </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
</template>

<!-- can give the navigation and submenus a background colour, set the font size and colour, and add a hover effect to the links. We can also use CSS to hide the submenus by default, and display them only when the parent link hovers over -->
<style scoped>

/* Remember the class router-link-active or .router-link-exact-active are dded when we are in the current route. We can style the active link! */
a.router-link-active {
  color: #fffbeb
}

/* https://tailwindcss.com/docs/display#block-and-inline */
li {
  display: inline-block;
}

/* a {
  color: #000;
  text-decoration: none;
  font-size: 20px;
  padding: 10px;
} */

/* a:hover {
  background-color: #ccc;
} */

/* ul ul {
  display: none;
} */

/* li:hover ul {
  display: block;
} */
</style>
