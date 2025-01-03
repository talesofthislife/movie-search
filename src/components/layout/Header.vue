<script setup lang="ts">
import {ref} from "vue";

// Track dropdown visibility
const isMobileMenuOpen = ref(false);
const isMoviesDropdownOpen = ref(false);
const isSeriesDropdownOpen = ref(false);

const isMobileMoviesDropdownOpen = ref(false);
const isMobileSeriesDropdownOpen = ref(false);

// Toggles the dropdown visibility
function toggleMoviesDropdown(isHovered: boolean) {
    isMoviesDropdownOpen.value = isHovered;
}

function toggleSeriesDropdown(isHovered: boolean) {
    isSeriesDropdownOpen.value = isHovered;
}


function toggleMobileMoviesDropdown(event: MouseEvent) {
    event.preventDefault();
    isMobileMoviesDropdownOpen.value = !isMobileMoviesDropdownOpen.value;
}

function toggleMobileSeriesDropdown(event: MouseEvent) {
  event.preventDefault();
  isMobileSeriesDropdownOpen.value = !isMobileSeriesDropdownOpen.value;
}

function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    isMobileMoviesDropdownOpen.value = false;
    isMobileSeriesDropdownOpen.value = false;
}
</script>
<!-- Aria is for accessibility -->
<template>
    <header>
        <!-- Navigation Bar (items always visible) - Desktop menu Desktop Menu - visible on screens bigger than 640px-->
        <div class="sm:bg-orange-500">
            <nav class="hidden sm:block py-3.5 container mx-auto">
                <ul class="hidden sm:flex sm:justify-start gap-x-8">
                    <li>
                        <a href="/" aria-label="Home">
                            <img
                                src="/vite.svg"
                                alt="Find a Movie or Series"
                                class="w-28 max-h-6"
                            />
                        </a>
                    </li>
                    <li><router-link to="/" class="">Home</router-link></li>
                    <li class="relative">
                        <!-- Movies Dropdown with ARIA (accessibility) attributes -->
                        <button
                            aria-haspopup="true"
                            v-bind:aria-expanded="isMoviesDropdownOpen"
                            v-on:mouseenter="toggleMoviesDropdown(true)"
                            v-on:mouseleave="toggleMoviesDropdown(false)"
                        >
                            Movies
                        </button>

                        <!-- Submenu displays only if isDropdownOpen is true  -->
                        <ul
                            v-if="isMoviesDropdownOpen"
                            v-on:mouseenter="toggleMoviesDropdown(true)"
                            v-on:mouseleave="toggleMoviesDropdown(false)"
                            class="absolute bg-orange-300 min-w-[150px] text-left text-sm rounded-md"
                        >
                            <li>
                                <router-link to="/movies/popular" class="block px-1 mt-3">
                                    Popular Movies
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/movies/top-rated" class="block px-1 my-3">
                                    Top Rated Movies
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="relative">
                        <!-- Movies Dropdown with ARIA (accessibility) attributes -->
                        <button
                            aria-haspopup="true"
                            v-bind:aria-expanded="isSeriesDropdownOpen"
                            v-on:mouseenter="toggleSeriesDropdown(true)"
                            v-on:mouseleave="toggleSeriesDropdown(false)"
                            class=""
                        >
                            TV Series
                        </button>
                        <!-- Submenu displays only if isDropdownOpen is true  -->
                        <ul
                            v-if="isSeriesDropdownOpen"
                            v-on:mouseenter="toggleSeriesDropdown(true)"
                            v-on:mouseleave="toggleSeriesDropdown(false)"
                            class="absolute bg-orange-300 min-w-[150px] text-left text-sm rounded-md"
                        >
                            <li>
                                <router-link to="/tv-series/popular" class="block px-1 mt-3">
                                    Popular TV Series
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/tv-series/top-rated" class="block px-1 my-3">
                                    Top Rated TV Series
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Mobile Menu - visible on mobile and hidden on screens bigger than 640px -->
        <div class="sm:hidden flex py-3.5 bg-orange-500">
            <button
                class="focus:outline-none"
                aria-label="Toggle menu"
                v-bind:aria-exapanded="isMobileMenuOpen"
                v-on:click="toggleMobileMenu"
            >
                <img src="../../assets/hamburger-menu-24x24.svg" alt="menu" class="w-28 max-h-6" />
            </button>
            <div>
                <a href="/" aria-label="Home" class="flex items-end">
                    <img src="/vite.svg" alt="Find a Movie or Series" class="w-28 max-h-6 pl-10" />
                </a>
            </div>
        </div>
        <div v-if="isMobileMenuOpen" class="flex flex-col items-center bg-orange-500/75">
            <ul class="flex flex-col gap-y-4 m-4">
                <li><router-link to="/" class="">Home</router-link></li>
                <li class="">
                    <!-- Movies Dropdown with ARIA (accessibility) attributes -->
                    <button
                        aria-haspopup="true"
                        v-bind:aria-expanded="isMobileMoviesDropdownOpen"
                        v-on:click="toggleMobileMoviesDropdown"
                    >
                        Movies
                    </button>

                    <!-- Submenu displays only if isMobileMoviesDropdownOpen is true  -->
                    <ul
                        v-if="isMobileMoviesDropdownOpen"
                        class="flex flex-col gap-y-4 mt-4 text-sm"
                    >
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
                    <!-- TV Series Dropdown with ARIA (accessibility) attributes -->
                    <button
                        aria-haspopup="true"
                        v-bind:aria-expanded="isMobileSeriesDropdownOpen"
                        v-on:click="toggleMobileSeriesDropdown"
                      
                    >
                        TV Series
                    </button>
                    <!-- Submenu displays only if isMobileSeriesDropdownOpen is true  -->
                    <ul
                        v-if="isMobileSeriesDropdownOpen"
                        class="flex flex-col gap-y-4 mt-4 text-sm"
                    >
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
        </div>
    </header>
</template>

<!-- can give the navigation and submenus a background colour, set the font size and colour, and add a hover effect to the links. We can also use CSS to hide the submenus by default, and display them only when the parent link hovers over -->
<style scoped>
/* Remember the class router-link-active or .router-link-exact-active are dded when we are in the current route. We can style the active link! */
a.router-link-active {
    color: #fffbeb;
}

/* https://tailwindcss.com/docs/display#block-and-inline */
/* li {
    display: inline-block;
} */

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
