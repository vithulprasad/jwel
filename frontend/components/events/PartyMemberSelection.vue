<template>
  <div>
    ths is the form for add memebers
    <button @click="goBack">Back</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["backToAddParty"]);

function goBack() {
  emit("backToAddParty");
}
</script>

<style scoped></style>
