<template>
  <!-- Top bar -->
  <div class="bg-red-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex">
        <p class="text-white p-3">Product preview</p>
      </div>

      <div class="text-center">
        <p class="text-white">Delete</p>

        <button @click="deleteProduct">
          <Icon
            name="carbon:delete"
            class="text-white hover:text-red-300 text-lg"
          ></Icon>
        </button>
      </div>

      <!-- Dashboard Link -->
      <div class="text-center">
        <p class="text-white">Dashboard</p>

        <NuxtLink to="/sellers/dashboard">
          <Icon
            class="text-white hover:text-red-300"
            name="carbon:dashboard"
          ></Icon>
        </NuxtLink>
      </div>
    </div>
  </div>

  <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[40%]">
        <img
          v-if="currentImage"
          class="rounded-lg object-fit"
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
              @mouseover="currentImage = image"
              @click="currentImage = image"
              width="70"
              class="rounded-md object-fit border-[3px] cursor-pointer"
              :class="currentImage === image ? 'border-[#FF5353]' : ''"
              :src="image"
              alt="carousel"
              v-if="image !== 'null'"
            />
          </div>
        </div>
      </div>
      <div class="md:w-[60%] bg-white p-3 rounded-lg">
        <div v-if="product && product.data">
          <!-- Use inputs because it may be necessary to make the products editable in the future -->
          <input
            class="mb-2 text-[30px] font-bold"
            v-model="productName"
            disabled="true" 
          />
          <textarea
            class="font-light text-[18px] mb-2 w-full resize-none overflow-hidden outline-none"
            rows="10"
            disabled="true"
          >
            {{ product.data.description }}
          </textarea>
        </div>

        <div class="border-b" />

        <div class="flex items-center justify-start gap-2 my-2">
          <div class="text-xl font-bold">
            <span>
              Price: $ <input v-model="productPrice" disabled="true"
            /></span>
          </div>
        </div>

        <div class="flex items-center justify-start gap-2 my-2">
          <div class="text-xl">
            <span>
              Category:
              <input v-model="productCategory" disabled="true" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const user = useSupabaseUser();
const userStore = useUserStore();

const route = useRoute();

let product = ref(null);
let currentImage = ref(null);
let canEdit = ref(false);

let productName = ref(null);
let productPrice = ref(null);
let productDescription = ref(null);
let productCategory = ref(null);

let images = ref(["", "", "", "", ""]);

definePageMeta({ middleware: "seller-auth" });

onBeforeMount(async () => {
  //get the product information from the database
  product.value = await useFetch(
    `/api/prisma/get-product-by-id/${route.params.id}`
  );

  productName.value = product.value.data.title;
  productPrice.value = product.value.data.price / 100;
  productDescription.value = product.value.data.description;
  productCategory.value = product.value.data.category;
});

watchEffect(() => {
  if (product.value && product.value.data) {
    currentImage.value = product.value.data.image1; //set the current image to the base image of the product
    
    //add the product images to the array which contains the images for the carousel
    images.value[0] = product.value.data.image1;
    images.value[1] = product.value.data.image2;
    images.value[2] = product.value.data.image3;
    images.value[3] = product.value.data.image4;
    images.value[4] = product.value.data.image5;
    userStore.isLoading = false;
  }
});

const deleteProduct = () => {
  useFetch(`/api/prisma/delete-product`, {
    method: 'PUT', 
    body: {
      sellerId: user.value.id, 
      productId: Number(route.params.id)
    }
  }).then((response) => {
    if (response.data.value){
      navigateTo('/sellers/dashboard');
    }
  })
};
</script>
