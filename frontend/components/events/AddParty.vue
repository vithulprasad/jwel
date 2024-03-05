<template>
  <div class="container bg-white rounded shadow" style="max-height: 100%">
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Add New Party</h4>
        <button class="btn" @click="closeDialog">
          <img src="/static/icon/close_button.svg" alt="" />
        </button>
      </div>
      <h6>{{ eventDetails.event_id }}</h6>
      <form @submit.prevent="submitForm">
        <!-- part logo -->
        <div></div>
        <!-- party name -->
        <div>
          <label for="partyName">Party Name</label>
          <input v-model="partyName" id="name" placeholder="Enter Paryt Name" />
        </div>
        <!-- //party tagline -->
        <div>
          <label for="partyTagline" class="form-label">Party Tagline</label>
          <textarea
            v-model="partyTagline"
            class="form-control"
            rows="3"
          ></textarea>
        </div>
        <!-- party members -->
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <label for="">Add members</label>
            <v-btn
              prepend-icon="$vuetify"
              variant="text"
              class="text-none"
              @click="openUserSelectionDialog"
            >
              Add members
            </v-btn>
          </div>
        </div>
        <!-- Submit button -->
        <div class="d-grid mt-4">
          <button class="btn btn-primary text-white" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<!-- Button with close logic -->
<!-- <button class="btn btn-danger" @click="closeDialog">Close</button> -->

<script setup>
import { useStore } from "~/store";
const emit = defineEmits(["closeDialog", "openUserSelectionDialog"]);
import { createEventParty } from "~/apiConfig/apiConfig";
import { ref, computed } from "vue";

const props = defineProps(["eventDetails"]);
console.log(props.eventDetails.event_id, "event id ");
const store = useStore();

function openUserSelectionDialog() {
  emit("openUserSelectionDialog");
  console.log("fucnion emited on add party");
}
function closeDialog() {
  emit("closeDialog");
}

const partyName = computed({
  get: () => store.partyName,
  set: (value) => store.setPartyName(value),
});

const partyTagline = computed({
  get: () => store.partyTagline,
  set: (value) => store.setPartyTagline(value),
});

// let partyName = ref("");
// let partyTagline = ref("");

const submitForm = async () => {
  try {
    const eventPartyData = {
      event_id: props.eventDetails.event_id,
      event_party_name: store.partyName,
      event_party_tagline: store.partyTagline,
    };
    const response = await createEventParty(eventPartyData);
    console.log(response.data);
    closeDialog();
  } catch (error) {
    console.error("Error creating event party:", error);
    alert("Error creating event party. Please try again!");
  }
};
</script>

<style scoped>
.form-container {
  max-height: 400px;
  overflow-y: auto;
  padding: 15px;
}
</style>
