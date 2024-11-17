<template>
    <div class="relative">
        <ul class="pagination absolute bottom-0 right-0 top-3">
            <li class="pagination-item">
                <button
                    type="button"
                    @click="onClickFirstPage"
                    :disabled="isInFirstPage"
                    aria-label="Go to first page"
                >
                    First
                </button>
            </li>
    
            <li class="pagination-item">
                <button
                    type="button"
                    @click="onClickPreviousPage"
                    :disabled="isInFirstPage"
                    aria-label="Go to previous page"
                >
                    Previous
                </button>
            </li>
    
            <!-- Visible Buttons Start -->
    
            <li v-for="page in pages" class="pagination-item">
                <button
                    type="button"
                    @click="onClickPage(page.name)"
                    :disabled="page.isDisabled"
                    :class="{active: isPageActive(page.name)}"
                    :aria-label="`Go to page number ${page.name}`"
                >
                    {{ page.name }}
                </button>
            </li>
    
            <!-- Visible Buttons End -->
    
            <li class="pagination-item">
                <button
                    type="button"
                    @click="onClickNextPage"
                    :disabled="isInLastPage"
                    aria-label="Go to next page"
                >
                    Next
                </button>
            </li>
    
            <li class="pagination-item">
                <button
                    type="button"
                    @click="onClickLastPage"
                    :disabled="isInLastPage"
                    aria-label="Go to last page"
                >
                    Last
                </button>
            </li>
        </ul>

    </div>
</template>

<script lang="ts" setup>
import {defineProps, computed} from "vue";

// https://www.digitalocean.com/community/tutorials/vuejs-vue-pagination-component
// The start number of our cycle depends on the current page:

// 1. When the current page is the first one, let’s show the user the current one and the next ones.
// 2. When the current page is the last one, let’s show the last page and the previous ones.
// 3. For anything in between let’s show the previous page and the next one(s).

// The end number of our cycle also needs some calculations. We need to get the smallest number between the total number of pages and the position where we want to stop. To calculate the position where we want to stop, we need the sum of the position where we want to start plus the maximum number of visible buttons. Because we always want to show one button to the left hand of the current page, we need to subtract 1 from this number.

// Let’s use a computed property that returns an array of objects with a range of visible pages. Each object will have a prop for the page number and another that will tell us whether the button should be disabled or not. After all, we don’t want the user to click for the page they’re already on.

const props = defineProps({
    maxVisibleButtons: {
        type: Number,
        required: false,
        default: 3
    },
    totalPages: {
        type: Number,
        required: true
    },
    perPage: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    }
});

const startPage = computed(() => {
    // When on the first page
    if (props.currentPage === 1) {
        return 1;
    }

    // When on the last page
    if (props.currentPage === props.totalPages) {
        return props.totalPages - props.maxVisibleButtons;
    }

    // When inbetween
    return props.currentPage - 1;
});

const pages = computed(() => {
    const range = [];

    for (
        let i = startPage.value;
        i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
        i++
    ) {
        range.push({
            name: i,
            isDisabled: i === props.currentPage
        });
    }

    return range;
});


const isInFirstPage = computed(() => {
    return props.currentPage === 1;
});

const isInLastPage = computed(() => {
    return props.currentPage === props.totalPages;
});

// define using type annotations https://vuejs.org/guide/components/events.html#declaring-emitted-events
const emit = defineEmits<{
  (event: 'pagechanged', page: number): void;
}>();

function onClickFirstPage() {
    emit('pagechanged', 1);
}

function onClickPreviousPage() {
    emit('pagechanged', props.currentPage - 1);
}

function onClickPage(page) {
    emit('pagechanged', page);
}

function onClickNextPage() {
    emit('pagechanged', props.currentPage + 1);
}
    
function onClickLastPage() {
    emit('pagechanged', props.totalPages);
}

function isPageActive(page) {
    return props.currentPage === page;
}
</script>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
</style>