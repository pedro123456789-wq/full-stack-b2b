<template>
  <div>
    <header class="bg-red-500 p-4 text-white">
      <h1 class="text-2xl font-semibold">Seller Dashboard</h1>
    </header>

    <div class="flex justify-center space-around">
      <button
        class="font-semibold p-3"
        :class="state === 'products' ? 'text-red-500' : ''"
        @click="state = 'products'"
      >
        My Products
      </button>
      <button
        class="font-semibold p-3"
        :class="state === 'orders' ? 'text-red-500' : ''"
        @click="state = 'orders'"
      >
        Orders
      </button>
    </div>

    <div v-if="state === 'products'">
      <div v-for="product in products">
        <ProductComponent :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();

let state = ref("products");
let products = ref([]);
let orders = ref([]);

definePageMeta({ middleware: "seller-auth" });

watchEffect(() => {
  useFetch(`/api/prisma/get-products-by-seller/${user.value.id}`).then(
    (response) => {
      products.value = response.data.value;
      console.log(products.value);
    }
  );
});
</script>
