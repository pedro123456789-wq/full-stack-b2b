<template>
  <div
    :id="`ProductComponent${order.product.id}`"
    class="bg-white inline-block shadow-lg rounded p-2"
  >
    <img
      class="rounded-t h-64 w-64"
      :src="!isComplete ? '/order.png' : '/order-completed.png'"
      alt="product"
    />

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
        <span>Delivery Address: {{ order.address }} - {{ order.zipCode }}</span>
      </span>

      <div v-if="!isComplete">
        <span class="flex items-center justify-start gap-3 px-1 pt-1">
          <span>Delivery time: {{ order.product.deliveryTimeDays }} days</span>
        </span>

        <span class="flex items-center justify-start gap-3 px-1 pt-1">
          <span>State: </span>
          <span :class="stateComputed === 'Late' ? 'text-red-500' : 'text-green-500'">{{ stateComputed }}</span>
        </span>

        <span class="flex items-center justify-start gap-3 px-1 pt-5">
          <button
            class="bg-green-300 rounded p-2 text-black font-semibold w-full"
            @click="markComplete"
          >
            Mark as completed
          </button>
        </span>
      </div>

      <div v-else>
        <span class="flex items-center justify-start gap-3 px-1 pt-5 text-green-500">
         Order Complete
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["order"]);
const { order } = toRefs(props);
let isComplete = ref(order.value.isCompleted);

const priceComputed = computed(() => {
  return order.value.product.price / 100;
});

const stateComputed = computed(() => {
  console.log(order.value);
  const dateOrdered = new Date(order.value.date);
  const timeElapsed = Date.now() - dateOrdered.getTime(); //time elapsed in miliseconds
  const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
  
  if (daysElapsed < order.value.product.deliveryTimeDays){
    return 'In Progress';
  }else{
    return 'Late';
  }
});

const markComplete = () => {
  useFetch(`/api/prisma/mark-order-as-complete/${order.value.id}`).then((response) => {
    if (response.data.value){
      isComplete.value = true;
    }
  })
}
</script>
