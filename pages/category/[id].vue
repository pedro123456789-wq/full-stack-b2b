<template>
  <MainLayout>
    <div
      id="CategoryPage"
      class="mt-4 max-w-[1200px] mx-auto px-1 bg-white shadow-lg rounded-lg p-5"
    >
      <div class="bg-white p-6">
        <h1 class="text-2xl font-bold text-red-400">{{ title(category) }}</h1>
      </div>

      <div
        class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 bg-white"
      >
        <div v-if="products" v-for="product in products.data" :key="product">
          <ProductComponent :product="product" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../../layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const route = useRoute();

const category = ref("");
let products = ref(null);

const title = (str) => str.charAt(0).toUpperCase() + str.slice(1);

onBeforeMount(async () => {
  products.value = await useFetch("/api/prisma/get-all-products");
  category.value = route.params.id;
  setTimeout(() => (userStore.isLoading = false), 1000);
});
</script>
