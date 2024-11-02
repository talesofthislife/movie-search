<!-- Component that will render the list of movies -->
 <!-- https://vuejs.org/guide/essentials/list#v-for -->
 <template>

    <div>

         <!-- TODO: Display a loading message or spinner until data is available -->
        <div v-if="!popularMovies">
            <p>Loading movies...</p>
        </div>

            <!-- Render the table only if popularMovies has data -->
        <div v-else>
            <h3>Here's a list of the latest movies in {{ countryName }}</h3>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genres</th>
                        <th scope="col">Popularity</th>
                        <th scope="col">Vote Average</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="popularMovie in popularMovies.results" v-bind:key="popularMovie.id">
                        <th scope="row">{{ popularMovie.title }}</th>
                        <td>{{ genre(popularMovie.genre_ids) }}</td>
                        <td>{{ popularMovie.popularity }}</td>
                        <td>{{ popularMovie.vote_average }}</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <Pagination 
                :totalPages = popularMovies.total_pages 
                :perPage = popularMovies.results.length
                :currentPage = popularMovies.page
                v-on:pagechanged="onPageChange"
            ></Pagination>
            
        </div>
        
    </div>

 </template>

 <script lang="ts" setup>

import Pagination from '../components/Pagination.vue';
import {getVisitorGeoLookup} from '../api/utils/getVisitorCountryCode';
import {getPopularMoviesByRegion, getMoviesGenres} from '../api/tmdb';
import type { PopularMoviesResponse, MovieGenresResponse } from '../api/tmdb';

import { ref, onMounted, defineProps, computed } from 'vue';

const countryCode = ref<string | null>(null);
const countryName = ref<string | null>('United Kingdom');
const popularMovies = ref<PopularMoviesResponse | null>(null);
const moviesGenres = ref<MovieGenresResponse | null>(null);
onMounted(async () => {
    // DISABLING AS THIS ALLOWS 100 CALLS PER MONTH
    // const visitorGeoLookup = await getVisitorGeoLookup()
    // TODO: Add fallback for countryCode in case getVisitorGeoLookup fails and report the error
    // countryCode.value = visitorGeoLookup.country_code;
    // countryName.value = visitorGeoLookup.country_name;
    // popularMovies.value = await getPopularMoviesByRegion(countryCode.value);

    popularMovies.value = await getPopularMoviesByRegion('GB');
    // console.log(popularMovies);
    moviesGenres.value = await getMoviesGenres();
    console.log(moviesGenres.value)
})

function genre(genreIds: number[]){
    const genreList = [];
    for (const genreId of genreIds){
             
        if(moviesGenres.value){
            for(const genre of moviesGenres?.value?.genres) {
                if(genreId === genre.id) {
                    genreList.push(genre.name);
                }
            }

        }    

    }
    return genreList.join(', ')
}

async function onPageChange(page: number) {
    popularMovies.value = await getPopularMoviesByRegion('GB',page);
}

</script>