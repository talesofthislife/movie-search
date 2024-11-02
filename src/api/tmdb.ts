// Calls to the TMDB API
import {tmdb_access_token} from "../config";

// List popular movies by the region of the visitor.

export type PopularMoviesResponse = {
    page: number;
    results: {
        adult: boolean;
        /**
         * Example:
         * /417tYZ4XUyJrtyZXj7HpvWf1E8f.jpg
         */
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        /**
         * example: en
         */
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        /**
         * example: /9w0Vh9eizfBXrcomiaFWTIPdboo.jpg
         */
        poster_path: string;
        /**
         * example: 2024-09-12
         */
        release_date: string;
        title: string;
        video: false;
        vote_average: number;
        vote_count: number;
    }[];
    total_pages: number;
    total_results: number;
};

export async function getPopularMoviesByRegion(
    countryCode: string,
    page = 1
): Promise<PopularMoviesResponse> {
    const params = new URLSearchParams({
        language: "en-US",
        page: page.toString(),
        region: countryCode
    });

    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?${params.toString()}`, {
        headers: {
            Authorization: `Bearer ${tmdb_access_token}`,
            Accept: "application/json"
        }
    });

    const data = (await res.json()) as PopularMoviesResponse;
    return data;
}

export type MovieGenresResponse = {
    genres: {
        id: number;
        name:
            | "Action"
            | "Adventure"
            | "Animation"
            | "Comedy"
            | "Crime"
            | "Documentary"
            | "Drama"
            | "Family"
            | "Fantasy"
            | "History"
            | "Horror"
            | "Music"
            | "Mystery"
            | "Romance"
            | "Science Fiction"
            | "TV Movie"
            | "Thriller"
            | "War"
            | "Western";
    }[];
};

export async function getMoviesGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list`, {
        headers: {
            Authorization: `Bearer ${tmdb_access_token}`,
            Accept: "application/json"
        }
    });

    const data = (await res.json()) as MovieGenresResponse;
    return data;
}
