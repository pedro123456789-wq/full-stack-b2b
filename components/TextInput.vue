<template>
  <div>
    <!-- by deafault nux pages are rendered server side and they send raw html to the client -->
    <!-- the client-only tag ensures that the input is only rendered in the client side -->
    <client-only>
      <input
        :placeholder="placeholder"
        :maxlength="max"
        class="w-full bg-white text-gray-800 border text-sm border-[#EFF0EB] rounded-lg p-3 placeholder-gray-500 focus:outline-none"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :class="({ 'border-gray-900': isFocused }, { 'border-red-500': error })"
        :type="inputType"
        v-model="inputComputed"
        autocomplete="off"
      />
    </client-only>
    <span v-if="error" class="text-red-500 text-[14px] font-semibold">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:input"]);
const props = defineProps([
  "input",
  "placeholder",
  "max",
  "inputType",
  "error",
]);
const { input, placeholder, max, inputType, error } = toRefs(props);
let isFocused = ref(false);

//computed is used to store dynamic state variables
//it is better than a function since it only gets called when on of the dependencies gets updated
const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit("update:input", val), //emits event when value is updated which is sent back to the parent, since the input prop is updated
});

//summary:
//having v-model:inputComputed triggers computed event when text in text input changes
//computed event changes the value of the input prop
//having v-model:input=email means that when the input is changed the email variable in the parent element also changes
</script>
