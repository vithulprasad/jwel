<template>
  <div>
    this is view party
    <button @click="closeviewDilog">close</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["closeviewDilog"]);
function closeviewDilog() {
  emit("closeviewDilog");
}
</script>

<style scoped></style>
