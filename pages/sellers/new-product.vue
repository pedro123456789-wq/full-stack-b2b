<template>
  <!-- Top bar -->
  <div class="bg-red-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Save button -->
      <div>
        <span class="text-md text-white"> Save </span>
        <button>
          <Icon
            name="carbon:save"
            class="text-white hover:text-green-300 text-lg"
          ></Icon>
        </button>
      </div>

      <!-- Error message -->
      <div class="max-w-[300px]" v-if="errorMessage">
        <span class="text-md text-yellow-500">{{ errorMessage }}</span>

        <Icon
          name="carbon:error"
          class="text-yellow-500 text-lg ml-3"
          v-if="errorMessage.length > 0"
        >
        </Icon>
      </div>

      <!-- Loading indicator -->
      <div class="max-w-[300px]" v-if="isLoading">
        <span class="text-md text-green-500">Creating product ...</span>

        <Icon name="carbon:time" class="text-green-500 text-lg ml-3">
        </Icon>
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

  <div id="newProductPage" class="mt-4 px-2 text-center">
    <div class="w-full text-center">
      <div class="bg-white p-3 rounded-lg">
        <div>
          <div class="flex items-center justify-center gap-2 my-2">
            <div>
              <span class="text-sm block text-left text-gray-500">
                Product name
              </span>
              <input
                v-model="productName"
                class="border-2 border-rose-500 text-lg"
              />
            </div>
          </div>

          <div class="flex items-center justify-center gap-2 my-2">
            <div class="w-full">
              <span class="text-sm block text-gray-500 text-left">
                Product description
              </span>

              <textarea
                class="font-light text-[18px] w-full border-2 border-rose-500 text-left"
                rows="7"
                v-model="productDescription"
              >
              </textarea>
            </div>
          </div>
        </div>

        <div class="border-b" />

        <div class="flex items-center justify-center gap-2 my-2 mt-4">
          <div>
            <span class="text-sm block text-gray-500 text-left">
              Price ($)
            </span>
            <input
              v-model="productPrice"
              class="border-2 border-rose-500 text-lg"
            />
          </div>
        </div>

        <div class="flex items-center justify-center gap-2 my-2 mt-4">
          <div>
            <span class="text-sm block text-gray-500 text-left">
              Category
            </span>
            <input
              v-model="productCategory"
              class="border-2 border-rose-500 text-lg"
            />
          </div>
        </div>

        <div class="flex items-center justify-center gap-2 my-2 mt-4">
          <div>
            <span class="text-sm block text-gray-500 text-left">
              Delivery time (days)
            </span>
            <input
              v-model="deliveryTime"
              class="border-2 border-rose-500 text-lg"
            />
          </div>
        </div>

        <div class="border-b" />

        <div class="flex space-around justify-center mt-5 pt-5">
          <ProductImageInput image-number="1" @selected-image="setImage" />
          <ProductImageInput image-number="2" @selected-image="setImage" />
          <ProductImageInput image-number="3" @selected-image="setImage" />
          <ProductImageInput image-number="4" @selected-image="setImage" />
          <ProductImageInput image-number="5" @selected-image="setImage" />
        </div>

        <div class="border-b mt-5" />

        <button
          class="bg-green-400 text-white text-[22px] p-5 w-full hover:bg-green-500"
          @click="submitProduct"
        >
          Save item
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
let productName = ref("");
let productDescription = ref("");
let productPrice = ref(0);
let productCategory = ref("");
let deliveryTime = ref(0);

let image1 = ref(null);
let image2 = ref(null);
let image3 = ref(null);
let image4 = ref(null);
let image5 = ref(null);

definePageMeta({ middleware: "seller-auth" });

//ATTENION: May need to be changed
const categories = [
  "lumber",
  "roofing",
  "piping",
  "insulation",
  "sliding",
  "flooring",
];

let errorMessage = ref("");
let isLoading = ref(false);

const setImage = (e) => {
  const imageNumber = e.imageNumber;
  const src = e.src;

  switch (imageNumber) {
    case "1":
      image1.value = src;
      break;
    case "2":
      image2.value = src;
      break;
    case "3":
      image3.value = src;
      break;
    case "4":
      image4.value = src;
      break;
    case "5":
      image5.value = src;
      break;
  }
};

const submitProduct = () => {
  //perform validation
  if (productName.value.length < 1) {
    errorMessage.value = "You must enter a product name";
    return;
  }

  if (productDescription.value.length < 100) {
    errorMessage.value =
      "The product description must have at least 100 characters";
    return;
  }

  if (!categories.includes(productCategory.value.toLowerCase())) {
    errorMessage.value = "You did not enter a valid product category";
    return;
  }

  if (isNaN(deliveryTime.value)) {
    errorMessage.value = "Invalid delivery time";
    return;
  }

  if (Number(deliveryTime.value) % 1 !== 0) {
    //check if delivery time is an integer
    errorMessage.value = "Invalid delivery time";
    return;
  }

  if (isNaN(productPrice.value)) {
    errorMessage.value = "Invalid product price";
    return;
  }

  if (
    !image1.value &&
    !image2.value &&
    !image3.value &&
    !image4.value &&
    !image5.value
  ) {
    console.log(image1.value);
    errorMessage.value = "You must add at least one image";
    return;
  }

  isLoading.value = true;

  useFetch("/api/prisma/create-product", {
    method: "POST",
    body: {
      title: productName.value,
      description: productDescription.value,
      price: Number(productPrice.value) * 100,
      category: productCategory.value,
      deliveryTimeDays: deliveryTime.value,
      sellerId: user.value.id,
      images: [
        image1.value,
        image2.value,
        image3.value,
        image4.value,
        image5.value,
      ],
    },
  }).then((response) => {
    if (response.data.value){
      window.scrollTo({top: 0, behavior: 'smooth'});
      isLoading.value = false;
      navigateTo('/sellers/dashboard');
    }
  });
};

watch(() => {
  if (errorMessage.value && errorMessage.value.length > 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      errorMessage.value = "";
    }, 2000);
  }
});
</script>