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
                placeholder="Search Schools"
                aria-label="Search"
              />
            </form>
          </div>
  
          <div>
            <button class="btn btn-primary ml-2 add-button" @click="openDialog">
              <img class="plus-icon" src="/static/icon/add_circle.svg" alt="" />
              Add Schools
            </button>
          </div>
        </div>
      </nav>
  
      <div class="container chips d-flex">
        <div class="flex-grow-1">
          <button
            v-for="(chip, index) in chips"
            :key="index"
            :class="[
              'btn btn-sm chip m-2',
              chip.status === 'disabled' ? 'btn-secondary' : 'btn-primary',
            ]"
            :disabled="chip.status === 'disabled'"
            :aria-disabled="chip.status === 'disabled'"
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
  
  <script>
  export default {
    data() {
      return {
        searchQuery: "",
        chips: [
          { label: "Independant Schools", status: "enabled" },
          { label: "Group Schools", status: "disabled" },
          
        ],
      };
    },
    methods: {
      openDialog() {
        // Logic for dialog box opening
        this.$emit("openDialog");
      },
    },
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
  