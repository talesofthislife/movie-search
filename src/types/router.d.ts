import 'vue-router';

// Extend / augment existing module to add `meta` types
declare module 'vue-router' {
    interface RouteMeta {
        title?: string; // Optional title property
    }
}
