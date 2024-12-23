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
    <header>
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li>
                    <!-- Remember the class router-link-active or .router-link-exact-active are dded when we are in the current route. We can style the active link! -->
                     <!-- Movies Dropdown with ARIA (accessibility) attributes -->
                    <button  aria-haspopup="true" v-bind:aria-expanded="isMoviesDropdownOpen" v-on:click="toggleMoviesDropdown">Movies</button>
                    <!-- Submenu displays only if isDropdownOpen is true  -->
                    <ul v-if="isMoviesDropdownOpen">
                        <li>
                          <router-link to="/movies/popular">
                            Popular Movies
                          </router-link>
                        </li>
                        <li>
                          <router-link to="/movies/top-rated">
                            Top Rated Movies
                          </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <!-- Remember the class router-link-active or .router-link-exact-active are dded when we are in the current route. We can style the active link! -->
                     <!-- Movies Dropdown with ARIA (accessibility) attributes -->
                     <button  aria-haspopup="true" v-bind:aria-expanded="isSeriesDropdownOpen" v-on:click="toggleSeriesDropdown">TV Series</button>
                    <!-- Submenu displays only if isDropdownOpen is true  -->
                    <ul v-if="isSeriesDropdownOpen">
                        <li>
                          <router-link to="/tv-series/popular">
                            Popular TV Series
                          </router-link>
                        </li>
                        <li>
                          <router-link to="/tv-series/top-rated">
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
a.router-link-active {
  color: pink;
}
</style>
