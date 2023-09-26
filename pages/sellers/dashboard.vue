<template>
  <div>
    <header class="bg-red-500 p-4 text-white">
      <h1 class="text-2xl font-semibold">Seller Dashboard</h1>
      <div class="flex justify-left space-evenly">
        <div v-if="user">
          <h3>{{ user.email }}</h3>
          <h3>Earnings: ${{ earnings }}</h3>
        </div>
      </div>
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

    <!-- show the products sold by the seller -->
    <div v-if="state === 'products'">
      <div
        class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 p-4"
      >
        <div v-for="product in products">
          <SellerProduct :product="product" />
        </div>
      </div>

      <div v-if="products.length === 0">
        <h1 class="text-center text-lg font-bold p-5 m-5">You don't have any products yet ...</h1>
      </div>

      <div class="text-center">
        <button
          class="bg-green-500 p-2 rounded text-white"
          @click="navigateTo('/sellers/new-product')"
        >
          Add new product
        </button>
      </div>
    </div>

    <!-- show the orders received by the seller -->
    <div v-if="state === 'orders'">
      <div
        class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 p-4"
      > 
        <div v-for="order in orders">
          <SellerOrder :order="order" :index="orders.indexOf(order)"
                      @order-update="updateOrder"/>
        </div>
      </div>

      <div v-if="orders.length === 0">
        <h1 class="text-center p-5 text-lg mt-5 font-bold">No orders yet...</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();

let state = ref("products");
let products = ref([]);
let orders = ref([]);

onBeforeMount(async () => {
  useFetch(`/api/prisma/get-products-by-seller/${user.value.id}`).then(
    (response) => {
      products.value = response.data.value;
    }
  );

  //get all of the orders received by the seller
  useFetch(`/api/prisma/get-orders-by-seller/${user.value.id}`).then(
    (response) => {
      orders.value = response.data.value;
    }
  );
});

onMounted(() => {
  if (!user.value) {
    return navigateTo("/sellers/auth");
  }
});

const earnings = computed(() => {
  let total = 0;

  orders.value.forEach((order) => {
    if (order.isCompleted) total += order.product.price / 100;
  });

  return total.toFixed(2);
});

const updateOrder = (e) => {
  const index = e.index;
  const order = e.order;

  orders.value[index] = order;
}
</script>
