<template>
  <div class="fixed z-[-1] bg-[#F2F2F2] w-full h-[100vh]" />
  <NuxtPage />

  <MenuOverlay
    :class="[
      {
        'max-h-[100vh] transition-all duration-200 ease-in visible':
          userStore.isMenuOverlay,
      },
      {
        'max-h-0 transition-all duration-200 ease-out invisible':
          !userStore.isMenuOverlay,
      },
    ]"
  />
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const route = useRoute();

let windowWidth = ref(process.client ? window.innerWidth : "");

onMounted(() => {
  userStore.isLoading = true;
  window.addEventListener("resize", function () {
    windowWidth.value = window.innerWidth;
  });
});

//toggle the mobile side menu off when the window size is large enough
watch(
  () => windowWidth.value,
  () => {
    if (windowWidth.value >= 767) {
      userStore.isMenuOverlay = false;
    }
  }
);

watch(
  () => route.fullPath,
  () => {
    userStore.isLoading = true;
  }
);
</script>

<!-- TODO -->
<!-- add option to view orders left to fulfil and orders fulfilled -->
<!-- reminder emails for sellers and users -->
