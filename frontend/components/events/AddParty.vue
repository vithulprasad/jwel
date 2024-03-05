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
              @click="openMemberSelectionDialog"
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
      <div class="events-party-member-selection">

        <EventsPartyMemberSelection v-if="showMemberSelection"/>
      </div>

    </div>
  </div>
</template>

<!-- Button with close logic -->
<!-- <button class="btn btn-danger" @click="closeDialog">Close</button> -->

<script setup>
const emit = defineEmits(["closeDialog"]);
import { createEventParty } from "~/apiConfig/apiConfig";
import { ref, computed } from "vue";

const props = defineProps(["eventDetails"]);
console.log(props.eventDetails.event_id, "event id ");
const showMemberSelection = ref(false);
function openMemberSelectionDialog() {
  showMemberSelection.value = true;
}
function closeDialog() {
  emit("closeDialog");
}

let partyName = ref("");
let partyTagline = ref("");

const submitForm = async () => {
  try {
    const eventPartyData = {
      event_id: props.eventDetails.event_id,
      event_party_name: partyName.value,
      event_party_tagline: partyTagline.value,
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
