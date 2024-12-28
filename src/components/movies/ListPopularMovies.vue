<!-- Example of listing movies: https://www.themoviedb.org/movie -->

<!-- Component that will render the list of movies -->
<!-- https://vuejs.org/guide/essentials/list#v-for -->
<!-- For now this lists the most popular movies -->
<!-- TODO: this should be updated to just list any movies according to selection -->
<template>
    <!-- TODO: Display a loading message or spinner until data is available -->
    <div v-if="!popularMovies">
        <p>Loading movies...</p>
    </div>

    <div v-else>
        <h3 class="text-lg font-medium mb-4">Here's a list of the most popular movies in {{ countryName }}</h3>

        <!-- Render only if popularMovies has data -->
         <ul>
             <li
                 v-for="popularMovie in popularMovies.results"
                 v-bind:key="popularMovie.id"
                 class="flex justify-between gap-x-6 py-5"
             >
                 <div class="flex min-w-0 gap-x-4">
                     <!-- check here how to list it https://developer.themoviedb.org/docs/image-basics -->
                     <img
                         class="size-fit flex-none rounded-lg bg-gray-50"
                         :src="`https://image.tmdb.org/t/p/w200${popularMovie.poster_path}`"
                         alt=""
                     />
                     <div class="min-w-0 flex-auto">
                         <!-- /6 is the line height -->
                         <p class="text-lg/6 font-semibold text-gray-900">{{ popularMovie.title }}</p>
                         <p class="mt-1 truncate text-xs/5 text-gray-500">
                             {{ genre(popularMovie.genre_ids) }}
                         </p>
                         <p class="mt-3 truncate text-base/5 text-gray-700">Overview </p>
                         <p class="mt-5 text-sm/6 font-semibold text-gray-600">{{ popularMovie.overview }}</p>
                     </div>
                     
                 </div>
                 
                 
                 <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                     <p class="text-sm/6 text-gray-900">Popularity: {{ popularMovie.popularity }}</p>
                     <p class="mt-1 text-xs/5 text-gray-500">
                         Average Vote: {{ popularMovie.vote_average }}
                     </p>
                 </div>
             </li>

         </ul>

        <Pagination
            :totalPages="popularMovies.total_pages"
            :perPage="popularMovies.results.length"
            :currentPage="popularMovies.page"
            v-on:pagechanged="onPageChange"
        ></Pagination>
    </div>
</template>

<script lang="ts" setup>
import Pagination from "../Pagination.vue";
import {getVisitorGeoLookup} from "../../api/utils/getVisitorCountryCode";
import {getPopularMoviesByRegion, getMoviesGenres} from "../../api/tmdb";
import type {PopularMoviesResponse, MovieGenresResponse} from "../../api/tmdb";

import {ref, onMounted, defineProps, computed} from "vue";

const countryCode = ref<string | null>(null);
const countryName = ref<string | null>("United Kingdom");
const popularMovies = ref<PopularMoviesResponse | null>(null);
const moviesGenres = ref<MovieGenresResponse | null>(null);
onMounted(async () => {
    // DISABLING AS THIS ALLOWS 100 CALLS PER MONTH
    // const visitorGeoLookup = await getVisitorGeoLookup()
    // TODO: Add fallback for countryCode in case getVisitorGeoLookup fails and report the error
    // countryCode.value = visitorGeoLookup.country_code;
    // countryName.value = visitorGeoLookup.country_name;
    // popularMovies.value = await getPopularMoviesByRegion(countryCode.value);

    popularMovies.value = await getPopularMoviesByRegion("GB");
    // console.log(popularMovies);
    moviesGenres.value = await getMoviesGenres();
    console.log(moviesGenres.value);
});

function genre(genreIds: number[]) {
    const genreList = [];
    for (const genreId of genreIds) {
        if (moviesGenres.value) {
            for (const genre of moviesGenres?.value?.genres) {
                if (genreId === genre.id) {
                    genreList.push(genre.name);
                }
            }
        }
    }
    return genreList.join(", ");
}

async function onPageChange(page: number) {
    popularMovies.value = await getPopularMoviesByRegion("GB", page);
}
</script>
