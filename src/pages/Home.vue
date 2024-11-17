<template>
    <!-- max-w-4xl: Limits the container width to approximately 1024px -->
    <!-- px-4: Adds horizontal padding inside the container for better spacing on smaller screens. -->
    <!-- py-8: Adds vertical padding for spacing above and below the content. -->
    <div class="container mx-auto max-w-4xl px-4 py-8" >
        <h1 class="text-2xl font-bold mb-6 text-center mb-8">Find your next Movie or Series</h1>
        <ListPopularMovies></ListPopularMovies>
    </div>
</template>

<script lang="ts" setup>
import ListPopularMovies from '../components/movies/ListPopularMovies.vue';

</script>