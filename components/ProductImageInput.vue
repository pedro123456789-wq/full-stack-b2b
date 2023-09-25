<template>
  <div class="p-2">
    <button
      class="border-2 border-black max-w-[200px]"
      @click="uploadImage"
      v-if="!image"
    >
      <img src="/imageUpload.jpeg" alt="upload" />
      Upload image {{ imageNumber }}
    </button>

    <button
      class="border-2 border-black"
      @click="removeImage"
      v-else
    >
      <img :src="image" alt="upload" class="max-w-[200px] max-h-[200px]"/>
      <div class="w-full bg-red-500 text-white">
        Delete Image
      </div>
    </button>
  </div>
</template>

<script setup>
const props = defineProps(["imageNumber"]);
const { imageNumber } = toRefs(props);
const emit = defineEmits(["selectedImage"]);

let image = ref(null);

const uploadImage = () => {
  //open input dialog and allow user to select the file
  //this method creates an invisible file input element and clicks
  //although this is a 'hacky' trick, there is no alternative

  const input = document.createElement("input");
  input.type = "file";
  input.onchange = () => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      image.value = reader.result;
      emit('selectedImage', {imageNumber: imageNumber.value, src: reader.result});
    });

    const files = Array.from(input.files);
    reader.readAsDataURL(files[0]);
    input.remove();
  };

  input.click();
};

const removeImage = () => {
    image.value = null;
    emit('selectedImage', {imageNumber: imageNumber.value, src: null});
}
</script>
