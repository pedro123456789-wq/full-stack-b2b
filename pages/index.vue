<template>
  <MainLayout>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div
        class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
      >
        <div v-if="products" v-for="product in products" :key="product">
          <ProductComponent :product="product" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layouts/MainLayout.vue";

const products = [
  {
    id: 1,
    title: "test product",
    description: "desc",
    url: "https://picsum.photos/id/82/300/300",
    price: 1000, //price in cents
  },
  {
    id: 1,
    title: "test product",
    description: "desc",
    url: "https://picsum.photos/id/80/300/300",
    price: 1000, //price in cents
  },
  {
    id: 1,
    title: "test product",
    description: "desc",
    url: "https://picsum.photos/id/60/300/300",
    price: 1000, //price in cents
  },
  {
    id: 1,
    title: "test product",
    description: "desc",
    url: "https://picsum.photos/id/23/300/300",
    price: 1000, //price in cents
  },
  {
    id: 1,
    title: "test product",
    description: "desc",
    url: "https://picsum.photos/id/30/300/300",
    price: 1000, //price in cents
  },
  {
    id: 1,
    title: "test product",
    description: "desc",
    url: "https://picsum.photos/id/20/300/300",
    price: 1000, //price in cents
  },
  {
    id: 1,
    title: "test product",
    description: "desc",
    url: "https://picsum.photos/id/20/300/300",
    price: 1000, //price in cents
  },
];
</script>
