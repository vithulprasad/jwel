<template>
  <div>
    <FormWizard
      v-model="currentStep"
      hide-buttons
      ref="formWizard"
      disable-back
      step-size="xs"
    >
      <TabContent title="Event Information">
        <div v-if="currentStep === 0">
          <!-- image preivew -->
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
          <!-- event name -->
          <div>
            <label for="name">Event Name</label>
            <input
              v-model="values.eventName"
              id="name"
              placeholder="Enter Event Name"
            />
          </div>
          <!-- event type -->
          <div>
            <label for="event-type" class="form-label">Event type</label>
            <select
              aria-placeholder="plese select events"
              v-model="values.eventType"
              class="form-select"
              id="event-type"
            >
              <option value="" disabled selected>
                Please select an event type
              </option>
              <option
                v-for="eventTypeOption in eventTypeOptions"
                :key="eventTypeOption.value"
                :value="eventTypeOption.value"
              >
                {{ eventTypeOption.label }}
              </option>
            </select>
          </div>
          <!-- About this event div -->
          <div>
            <label for="about-event" class="form-label">About this event</label>
            <textarea
              v-model="values.aboutEvent"
              class="form-control"
              id="about-event"
              rows="3"
            ></textarea>
          </div>
          <!-- radio button -->

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
          <div>
            <div class="d-flex">
              <div class="p-1 m-1">
                <label for="event-datetime">Event start Date </label>
                <VueDatePicker
                  v-model="values.eventStartDate"
                  :enable-time-picker="false"
                />
              </div>
              <div class="p-1 m-1">
                <label for="event-datetime">Event start time </label>
                <VueDatePicker v-model="values.eventStartTime" time-picker />
              </div>
            </div>
            <div class="d-flex">
              <div class="p-1 m-1">
                <label for="event-datetime">Event End Date </label>
                <VueDatePicker
                  v-model="values.eventEndDate"
                  :enable-time-picker="false"
                />
              </div>
              <div class="p-1 m-1">
                <label for="event-datetime">Event End time </label>
                <VueDatePicker v-model="values.eventEndTime" time-picker />
              </div>
            </div>
          </div>

          <!-- school name -->
          <div>
            <label for="name">School Name</label>
            <input
              v-model="values.schoolName"
              id="name"
              placeholder="Enter School Name"
            />
          </div>

          <!-- orientation name -->
          <div>
            <label for="name">Orientation Venue</label>
            <input
              v-model="values.orientationVenue"
              id="name"
              placeholder="Enter Orinetation veunu"
            />
          </div>

          <!-- orientation date -->
          <div>
            <label for="event-datetime">Orientaion date </label>
            <VueDatePicker
              v-model="values.orientataionDate"
              :enable-time-picker="false"
            />
          </div>
          <!-- age restriction  -->
          <div>
            <label for="age-restriction" class="form-label"
              >Age restriction</label
            >
            <select
              aria-placeholder="plese select age"
              v-model="values.ageRestriction"
              class="form-select"
              id="age-restriction"
            >
              <option value="" disabled selected>
                Please select an age group
              </option>
              <option
                v-for="ageOption in ageOptions"
                :key="ageOption.value"
                :value="ageOption.value"
              >
                {{ ageOption.label }}
              </option>
            </select>
          </div>
        </div>
      </TabContent>
      <TabContent title="Event Management">
        <div v-if="currentStep === 1">
          <!-- mentors -->
          <div>
            <label for=""> mentors</label>
            <v-select
              v-model="values.selectedMentors"
              :items="mentors"
              label="Select Item"
              multiple
              variant="outlined"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="text-grey text-caption align-self-center"
                >
                  (+{{ values.selectedMentors.length - 2 }} others)
                </span>
              </template>
            </v-select>
          </div>
          <!-- speakers -->
          <div>
            <label for=""> Speakers</label>
            <v-select
              v-model="values.selectedSpeakers"
              :items="speakers"
              label="Select Item"
              multiple
              variant="outlined"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="text-grey text-caption align-self-center"
                >
                  (+{{ values.selectedSpeakers.length - 2 }} others)
                </span>
              </template>
            </v-select>
          </div>

          <!-- minitstries -->
          <div>
            <label for=""> Ministries</label>
            <v-select
              v-model="values.selectedMinistries"
              :items="minitstries"
              label="Select Item"
              multiple
              variant="outlined"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="text-grey text-caption align-self-center"
                >
                  (+{{ values.selectedMinistries.length - 2 }} others)
                </span>
              </template>
            </v-select>
          </div>
        </div>

        <div></div>
      </TabContent>

      <button v-if="currentStep !== 0" type="button" @click="prevStep">
        Previous
      </button>

      <button v-if="currentStep !== stepLength" type="button" @click="nextStep">
        Next
      </button>

      <button v-if="currentStep === stepLength" type="button" @click="onFinish">
        Finish
      </button>
    </FormWizard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const imagePreview = ref(null);
const fileInputRef = ref(null);
import { FormWizard, TabContent } from "vue3-form-wizard";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { createEvent } from "~/apiConfig/apiConfig";

const currentStep = ref(0);
const formWizard = ref(null);
const stepLength = 1;
const props = defineProps(["closeDialog"]);

const mentors = [
  { title: "foo" },
  { title: "bar" },
  { title: "fizz" },
  { title: "buzz" },
  { title: "fizzbuzz" },
  { title: "foobar" },
];
const speakers = [
  { title: "speaker1" },
  { title: "speaker2" },
  { title: "speaker3" },
  { title: "speaker4" },
  { title: "speaker5" },
  { title: "speaker6" },
];
const minitstries = [
  { title: "ministry1" },
  { title: "ministry2" },
  { title: "ministry3" },
  { title: "ministry4" },
  { title: "ministry5" },
  { title: "ministry6" },
];

const ageOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
];
const eventTypeOptions = [
  { label: "Conference", value: "conference" },
  { label: "Workshop", value: "workshop" },
  { label: "Seminar", value: "seminar" },
];
const values = ref({
  eventName: "",
  eventType: "",
  eventStatus: "",
  eventStartDate: null,
  eventStartTime: null,
  eventEndDate: null,
  eventEndTime: null,
  schoolName: "",
  orientationVenue: "",
  orientataionDate: null,
  ageRestriction: "",
  selectedMentors: [],
  selectedSpeakers: [],
  selectedMinistries: [],
});

function nextStep() {
  if (currentStep.value < stepLength) {
    currentStep.value++;
    formWizard.value.nextTab();
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
    formWizard.value.prevTab();
  }
}

// file upload logic on frontend
const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    previewImage(file);
  }
};

const previewImage = (file) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };

  reader.readAsDataURL(file);
};

const removeImage = () => {
  imagePreview.value = null;
  fileInputRef.value.value = "";
};

const onFinish = async () => {
  try {
    console.log(values.value, "this is fomr data");
    // const response = await axios.post(
    //   "http://localhost:8088/api/create_event",
    //   values.value
    // );
    const response = await createEvent(values.value);

    console.log("Form submitted:", response.data);
    props.closeDialog();
  } catch (error) {
    console.error("Error submitting form:", error);
    // Handle error (e.g., show an error message to the user)
  }
};
</script>

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

button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
