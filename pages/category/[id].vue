<template>
  <MainLayout>
    <div
      id="CategoryPage"
      class="mt-4 min-h-[600px] max-w-[1200px] mx-auto px-1 bg-white shadow-lg rounded-lg p-5"
    >
      <div id="breadcrumb" class="pb-5 mb-5">
        <ul class="flex">
          <li
            v-for="(item, index) in routes"
            :key="index"
            class="flex items-center"
          >
            <span
              v-if="index !== 0"
              class="mx-1 text-xl font-bold text-blue-400"
              >&gt;</span
            >

            <div v-if="index != routes.length - 1">
              <router-link
                :to="item.to"
                class="text-xl font-bold text-red-400 hover:text-red-500"
                >{{ item.label }}</router-link
              >
            </div>

            <div v-else>
              <p class="text-xl font-bold">
                {{ item.label }}
              </p>
            </div>
          </li>
        </ul>
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

const category = route.params.id;
let products = ref(null);

const title = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const routes = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/",
    label: "Categories",
  },
  {
    to: "#",
    label: title(category),
  },
];

onBeforeMount(async () => {
  products.value = await useFetch(
    `/api/prisma/get-products-by-category/${route.params.id}`
  );

  setTimeout(() => (userStore.isLoading = false), 1000);
});
</script>
