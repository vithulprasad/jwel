<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
          <form class="form-inline my-2 my-lg-0">
            <input
              v-model="searchQuery"
              class="form-control mr-sm-2 bg-body-secondary custom-search"
              type="search"
              placeholder="Search Users"
              aria-label="Search"
            />
          </form>
        </div>

        <div>
          <button class="btn btn-primary ml-2 add-button" @click="openDialog">
            <img class="plus-icon" src="/static/icon/add_circle.svg" alt="" />
            Add Users
          </button>
        </div>
      </div>
    </nav>

    <div class="container chips d-flex">
      <div class="flex-grow-1 ">
        <button

          v-for="(chip, index) in chips"
          :key="index"
          :class="[
            'btn btn-sm chip ',
            chip.label === selectedUserType ? 'btn-primary' : 'btn-secondary',
          ]"
          @click="filterStudents(chip.label)"
        >
          {{ chip.label }}
        </button>
      </div>
      <div class="">
        <v-checkbox label="Select all"></v-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emits = defineEmits(["openDialog", "filterStudents"]);

const searchQuery = ref("");
const selectedUserType = ref("All Users");

const chips = ref([
  { label: "All Users" },
  { label: "Students" },
  { label: "Admins" },
]);

const openDialog = () => {
  // Logic for dialog box opening
  emits("openDialog");
};

const filterStudents = (label) => {
  selectedUserType.value = label;

  console.log("Clicked label:", label);

  emits("filterStudents", label);
};
</script>

<style scoped>
/* Add any custom styles here if needed */
.left-nav {
  background-color: aqua;
}
.right-nav {
  background-color: blue;
}
.add-button {
  display: flex;
  align-items: center;
}
.plus-icon {
  padding-right: 0.2rem;
}
.chip {
  border-radius: 8px;
}
.chips {
  margin-top: 1rem;
  margin-bottom: 1rem;
  
}
.custom-search {
  width: 320px;
}
</style>
