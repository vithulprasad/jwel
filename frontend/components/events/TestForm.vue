<template>
  <div>
    <p>cover image</p>
    <!-- cover Image div -->
    <div>
      <input
        v-if="!imagePreview"
        type="file"
        @change="handleFileChange"
        ref="fileInput"
        class="form-control mb-2"
      />
      <div v-if="imagePreview" class="mb-2 position-relative">
        <img :src="imagePreview" alt="Preview" class="img-thumbnail" />
        <button
          @click="removeImage"
          class="btn btn-danger position-absolute top-0 end-0 mt-2 me-2"
        >
          Remove Image
        </button>
      </div>
    </div>
    <!-- Event Name div -->
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >Event Name</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Enter Event Name"
        v-model="eventName"
        @change="handleInput"
      />
    </div>
    <!-- Event type div -->
    <div>
      <label for="exampleFormControlInput1" class="form-label"
        >Event type</label
      >
      <select class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <!-- About this event div -->
    <div>
      <label for="exampleFormControlTextarea1" class="form-label"
        >About this event</label
      >
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <!-- radio button div -->
    <div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="eventStatus"
          id="open"
          value="open"
          v-model="values.eventStatus"
        />
        <label class="form-check-label" for="open">open </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="eventStatus"
          id="closed"
          value="closed"
          v-model="values.eventStatus"
        />
        <label class="form-check-label" for="closed">Closed</label>
      </div>
    </div>
    <!-- date and time -->

    <!-- school name -->
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >school Name</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Enter school Name"
      />
    </div>

    <!-- orientation venue -->
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >orientation venue</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Enter orientation venue"
      />
    </div>
    <!-- Orientation date -->

    <VueDatePicker v-model="time" time-picker />

    <!-- Age restriction -->
    <div>
      <label for="exampleFormControlInput1" class="form-label"
        >Age restriction</label
      >
      <select class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { store } from "~/store/store";
const eventName = ref();
const Store = store();
const handleInput = () => {
  Store.createForm(eventName.value);
};
</script>

<script>
export default {
  data() {
    return {
      imagePreview: null,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];

      if (file) {
        this.previewImage(file);
      }
    },
    previewImage(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    removeImage() {
      this.imagePreview = null;
      this.$refs.fileInput.value = "";
    },
  },
};
</script>

<style scoped>
.form-container {
  max-height: 400px;
  overflow-y: auto;
  padding: 15px;
}
</style>
