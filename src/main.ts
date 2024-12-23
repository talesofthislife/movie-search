// https://chatgpt.com/c/670beb2e-4aa0-8007-b1d7-c4d975d46c74

import {createApp} from "vue";
import {createRouter, createWebHistory} from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "./pages/Home.vue";
// import BaseCard from "./components/ui/BaseCard.vue";
// import BaseList from "./components/ui/BaseList.vue";
import ListPopularMovies from "./components/movies/ListPopularMovies.vue";
import ListTopRatedMovies from "./components/movies/ListTopRatedMovies.vue";
import ListPopularSeries from "./components/tvSeries/ListPopularSeries.vue";
import ListTopRatedSeries from "./components/tvSeries/ListTopRatedSeries.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home,
            meta: {
                title: "Movie and Series Search - Home"
            }
        },
        {
            path: "/movies",
            // component: ListPopularMovies,
            // meta: {
            //     title: "List of popular movies"
            // },
            children: [
                {
                    path: '/movies/popular',
                    component: ListPopularMovies,
                    meta: {
                        title: "List of popular movies"
                    },
                },
                {
                    path: '/movies/top-rated',
                    component: ListTopRatedMovies,
                    meta: {
                        title: "List of top-rated movies"
                    },
                }
            ]
        },
        {
            path: "/tv-series",
            // component: ListPopularMovies,
            // meta: {
            //     title: "List of popular movies"
            // },
            children: [
                {
                    path: '/tv-series/popular',
                    component: ListTopRatedSeries,
                    meta: {
                        title: "List of popular series"
                    },
                },
                {
                    path: '/tv-series/top-rated',
                    component: ListTopRatedSeries,
                    meta: {
                        title: "List of top-rated series"
                    },
                }
            ]
        }
    ]
});

// https://router.vuejs.org/guide/advanced/navigation-guards.html#Global-After-Hooks
router.afterEach((to, _from) => {
    // After navigation dynamically change page title.
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});

const app = createApp(App);

// https://vuejs.org/api/application.html#app-config-errorhandler
app.config.errorHandler = (err, instance, info) => {
    // Create some kind of error handling service
    console.log(err, instance, info);
};

app.use(router);

// Global components
// app.component("BaseCard", BaseCard);
// app.component("BaseList", BaseList);

app.mount("#app");
