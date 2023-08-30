<template>
  <MainLayout>
    <div
      id="IndexPage"
      class="mt-4 max-w-[1200px] mx-auto px-2 bg-white shadow-lg rounded-lg"
    >
      <div class="bg-white p-6">
        <h1 class="text-2xl font-bold text-red-400">Our Product Categories</h1>
      </div>

      <div
        class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-4 bg-white"
      >
        <div v-for="category in categories">
          <CategoryItem :name="category" :imageUrl="getImagePath(category)" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const categories = [
  "lumber",
  "roofing",
  "piping",
  "insulation",
  "sliding",
  "flooring",
];

const getImagePath = (category) => {
  return `${category}.png`;
};

// load all of the products from the database
onBeforeMount(async () => {
  setTimeout(() => (userStore.isLoading = false), 1000);
});
</script>
