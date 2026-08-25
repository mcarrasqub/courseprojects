<script setup lang="ts">
import BookReviews from '@/components/BookReviews.vue';
import { BookService } from '@/services/BookService.js';
import { OtherService } from '@/services/OtherService.js';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const bookId = computed(() => Number(route.params.id));
const book = computed(() => BookService.getBookById(bookId.value));

function formatPrice(price: number): string {
  return OtherService.formatToCOP(price);
}
</script>


<template>
  <section v-if="book">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 gap-12">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-8 mb-8">
            <div class="flex items-start space-x-8">
              <div>
                <img
                  src="https://picsum.photos/seed/picsum/536/354"
                  :alt="`Cover image for ${book.title}`"
                  class="object-cover rounded shadow-sm w-72 h-auto"
                />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ book.title }}</h2>
                <div class="prose text-gray-600">
                  <p class="mb-4">
                    "{{ book.title }}" is an outstanding work in the {{ book.category }} category.
                    This work is an important part of our collection and has been carefully selected
                    to enrich the reading experience of our users.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Book Information</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Title:</span>
                  <span class="font-medium">
                    {{ book.title }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Category:</span>
                  <span class="font-medium">
                    {{ book.category }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Price:</span>
                  <span class="font-medium">${{ formatPrice(book.price) }} COP</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Stock:</span>
                  <span class="font-medium">
                    {{ book.stock }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 mt-8">
            <BookReviews :book-id="book.id" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="max-w-7xl mx-auto py-12 text-center">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h2>
    <p class="text-gray-600 mb-6">The requested book could not be found.</p>
    <RouterLink
      to="/books"
      class="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition"
    >
      Back to Books
    </RouterLink>
  </section>
</template>
 