<template>
  <div
    :id="`ProductComponent1`"
    class="inline-block rounded hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.15)] cursor-pointer p-5"
  >
    <div id="ProductDetails">
      <p class="px-1 pt-0.5 text-s text-[#3a65ab] text-center">
        {{ title(name) }}
      </p>
    </div>
    <NuxtLink :to="`/category/${name}`">
      <img class="rounded-t w-96 h-64" :src="imageUrl" alt="product" />
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps(["name", "imageUrl"]);
const { name, imageUrl } = toRefs(props);

const title = (str) => {
  //make the first letter in the string uppercase
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>
