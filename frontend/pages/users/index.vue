<template>
  <div data-page="users">
    <UsersUserHeader @openDialog="openDialog" />
    <div class="container">
      <div class="row">
        <div
          :class="{ 'col-lg-6': isDialogOpen, 'col-lg-12': !isDialogOpen }"
          class="col-md-12 col-sm-12 pt-2"
        >
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
              <UsersUserList />
            </div>
          </div>
        </div>
        <div v-if="isDialogOpen" class="col-lg-6 col-md-12 col-sm-12 pt-2">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
              <UsersAddUser @closeDialog="closeDialog" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "main",
});

const isDialogOpen = ref(false);

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
