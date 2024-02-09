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
              placeholder="Search Ministries"
              aria-label="Search"
            />
          </form>
        </div>

        <div>
          <button class="btn btn-primary ml-2 add-button" @click="openDialogM">
            <img class="plus-icon" src="/static/icon/add_circle.svg" alt="" />
            Add Ministry
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
     
    };
  },
  methods: {
    openDialogM() {
      // Logic for dialog box opening
      this.$emit("openDialogM");
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
