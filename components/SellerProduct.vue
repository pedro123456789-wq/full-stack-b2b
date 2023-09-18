<template>
  <div
    :id="`ProductComponent${product.id}`"
    class="bg-white inline-block shadow-lg rounded p-2 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.15)] cursor-pointer"
  >
    <NuxtLink :to="`/sellers/product-view/${product.id}`">
      <img class="rounded-t max-w-[200px]" :src="product.image1" alt="product" />

      <div id="ProductDetails">
        <p class="px-1 pt-0.5 font-bold text-s">
          {{ product.title.substring(0, 60) }}
        </p>

        <span class="flex items-center justify-start gap-3 px-1 pt-1">
          <span>Price: ${{ priceComputed }}</span>
        </span>

        <span class="flex items-center justify-start gap-3 px-1 pt-1">
          <span>Category: {{ product.category }}</span>
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
// TODO: add validation

const props = defineProps(["product"]);
const { product } = toRefs(props);

const priceComputed = computed(() => {
  return product.value.price / 100;
});
</script>
