<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
          <div>
            <h6>Bills</h6>
            <p>
              Amplify your voice, pose questions – an invitation to engage,
              inquire, and foster dialogue
            </p>
          </div>
        </div>

        <div>
          <NuxtLink to="bills/newBill">
            <button
              class="btn btn-primary ml-6 pl-2 add-button"
              @click="newBill"
            >
              Create Bill
            </button>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup></script>

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
h6 {
  color: #2f3e6d;
  font-size: 1rem;
  font-weight: 600;
  line-height: 20px;
}
p {
  color: #6e7ca8;
  font-size: 14px;
  font-weight: 400;
  line-height: 1rem;
}
</style>
