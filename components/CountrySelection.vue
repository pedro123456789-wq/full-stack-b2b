<template>
  <div class="mb-3">
    <div class="flex justify-center">
      <input
        v-model="searchQuery"
        class="w-full bg-white text-gray-800 border text-sm border-[#EFF0EB] rounded-lg p-3 placeholder-gray-500 focus:outline-none"
        placeholder="Country"
        :disabled="hasSelected"
      />

      <div v-if="countrySelected.length > 0" class="p-3">
        <button @click.prevent="reset">
          <Icon name="carbon:close"></Icon>
        </button>
      </div>
    </div>

    <div class="mt-2 max-h-40 overflow-y-auto">
      <div
        v-if="searchQuery.length > 0 && countrySelected.length == 0"
        v-for="country in filteredCountries"
        :key="country.alpha2Code"
        class="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
        @click="selectCountry(country)"
      >
        <Icon
          :name="`circle-flags:${country.alpha2Code.toLowerCase()}`"
          class="w-6 h-6 mr-3"
        />
        {{ country.name }}
      </div>
    </div>

    <span v-if="error" class="text-red-500 text-[14px] font-semibold">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:country"]);

const props = defineProps(["error"]);
const { error } = toRefs(props);

let searchQuery = ref("");
let countrySelected = ref("");

const countries = [
  { alpha2Code: "US", name: "United States" },
  { alpha2Code: "CA", name: "Canada" },
  { alpha2Code: "GB", name: "United Kingdom" },
];

//see details about computed varaibles here: https://vuejs.org/guide/essentials/computed.html
const filteredCountries = computed(() => {
  return countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectCountry = (country) => {
  searchQuery.value = country.name;
  countrySelected.value = country.name;
  emit("update:country", country.value); //send the country selected information back to the parent element
};

const reset = () => {
  searchQuery.value = "";
  countrySelected.value = "";
  emit("update:country", "");
};
</script>
