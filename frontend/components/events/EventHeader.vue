<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <div class="collapse navbar-collapse" id="navbarNav">
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search Events"
            aria-label="Search"
          />
        </form>
      </div>

      <div>
        <button class="btn btn-primary ml-2 add-button" @click="addEvent">
          <img class="plus-icon" src="/static/icon/add_circle.svg" alt="" />
          Add Event
        </button>
      </div>
    </div>
  </nav>

  <div class=" container chips">
    <button type="button" class="btn btn-primary btn-sm chip ">
      Ongoing
    </button>
    <button type="button" class="btn btn-secondary btn-sm chip chip2" disabled>
      Completed
    </button>
    <button type="button" class="btn btn-secondary btn-sm chip chip2" disabled>
      Draft
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    addEvent() {
      // Handle the logic for adding an event
      console.log("Add Event clicked!");
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
.chip2 {
  margin-left: 0.8rem;
}
.chips {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
