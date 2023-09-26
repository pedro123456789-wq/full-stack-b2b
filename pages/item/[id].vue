<template>
  <MainLayout>
    <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="md:flex gap-4 justify-between mx-auto w-full h-full">
        <div class="md:w-[40%]">
          <img
            v-if="currentImage"
            class="rounded-lg w-96 h-64"
            :src="currentImage"
            alt="current"
          />

          <!-- check if the images have been loaded -->
          <!-- once they have display them in a carousel at the bottom of the main image -->

          <div
            v-if="images[0] !== ''"
            class="flex items-center justify-center mt-2"
          >
            <div v-for="image in images">
              <img
                v-if="image != 'none'"
                @mouseover="currentImage = image"
                @click="currentImage = image"
                width="70"
                class="rounded-md object-fit border-[3px] cursor-pointer w-32 h-32"
                :class="currentImage === image ? 'border-[#FF5353]' : ''"
                :src="image"
                alt="carousel"
              />
            </div>
          </div>
        </div>

        <div class="md:w-[60%] bg-white p-3 rounded-lg">
          <div v-if="product && product.data">
            <p class="mb-2 text-[25px] font-semibold">{{ product.data.title }}</p>
            <p class="font-light text-[15px] mb-2">
              {{ product.data.description }}
            </p>

            <div class="border-b" />

            <div class="flex items-center justify-start gap-2 my-2">
              <div class="text-xl font-bold">$ {{ priceComputed }}</div>
            </div>

            <p class="text-[#009A66] text-md font-semibold pt-1">
              Delivery time: {{ product.data.deliveryTimeDays }} days
            </p>

            <div class="py-2" />
          </div>


          <button
            @click="addToCart()"
            :disabled="isInCart"
            class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#FF851A] to-[#FFAC2C]"
          >
            <div v-if="isInCart">Added to cart</div>
            <div v-else>Add to Cart</div>
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

const route = useRoute();

let product = ref(null);
let currentImage = ref(null);
let images = ref(['','','','','']);

onBeforeMount(async () => {
  //get the product information from the database
  product.value = await useFetch(
    `/api/prisma/get-product-by-id/${route.params.id}`
  );
});

watchEffect(() => {
  if (product.value && product.value.data) {
    currentImage.value = product.value.data.image1; //set the current image to the base image of the product
    
    images.value[0] = product.value.data.image1;
    images.value[1] = product.value.data.image2;
    images.value[2] = product.value.data.image3;
    images.value[3] = product.value.data.image4;
    images.value[4] = product.value.data.image5;

    userStore.isLoading = false;
  }
});

//check if the product is in the cart
const isInCart = computed(() => {
  let res = false;
  userStore.cart.forEach((prod) => {
    if (route.params.id == prod.id) {
      res = true;
    }
  });
  return res;
});

const priceComputed = computed(() => {
  if (product.value && product.value.data) {
    return product.value.data.price / 100;
  }
  return "0.00";
});


const addToCart = () => {
  userStore.cart.push(product.value.data);
};
</script>