<template>
  <div
    :id="`ProductComponent${order.product.id}`"
    class="bg-white inline-block shadow-lg rounded p-2"
  >
    <img class="rounded-t max-w-[200px]" src="/order.png" alt="product" />

    <div id="ProductDetails">
      <p class="px-1 pt-0.5 font-bold text-s">
        {{ order.product.title.substring(0, 60) }}
      </p>

      <span class="flex items-center justify-start gap-3 px-1 pt-1">
        <span>Price: ${{ priceComputed }}</span>
      </span>

      <span class="flex items-center justify-start gap-3 px-1 pt-1">
        <span>Date Ordered: {{ order.date.split("T")[0] }}</span>
      </span>

      <span class="flex items-center justify-start gap-3 px-1 pt-1">
        <span>Delivery time: [DAYS] days</span>
      </span>

      <span class="flex items-center justify-start gap-3 px-1 pt-1">
        <span>State: </span>
        <span :class="'text-yellow-500'">In Progress</span>
      </span>

      <span class="flex items-center justify-start gap-3 px-1 pt-5">
        <button
          class="bg-green-300 rounded p-2 text-black font-semibold w-full"
        >
          Mark as completed
        </button>
      </span>

      <span class="flex items-center justify-start gap-3 px-1 pt-1">
        <button class="bg-red-300 rounded p-2 text-black font-semibold w-full">
          Cancel order
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["order"]);
const { order } = toRefs(props);

const priceComputed = computed(() => {
  return order.value.product.price / 100;
});
</script>
