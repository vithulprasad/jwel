<template>
  <form>
    <div>
      <label for="name">Minstry Name</label>
      <input id="name" placeholder="Enter Minstry Name" />
    </div>
    <div class="d-grid mt-4">
      <button class="btn btn-primary text-white" type="button">Save</button>
    </div>
  </form>
</template>

<script setup></script>

<style>
label {
  display: block;
  margin-bottom: 5px;
}
input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
