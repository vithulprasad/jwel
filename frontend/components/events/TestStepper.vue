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
            <label for="event-type" class="form-label">Schools</label>
            <div v-if="!isLoading">
              <v-select
                v-model="selectedSchoolId"
                :items="formattedSchools"
                label="Select School"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip>
                  <span
                    v-if="index === 2"
                    class="text-grey text-caption align-self-center"
                  >
                    (+{{ selectedSchoolId.length - 2 }} others)
                  </span>
                </template>
              </v-select>
            </div>
            <div v-else>Loading...</div>
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
            <label for="event-type" class="form-label">Mentors</label>
            <div v-if="!isLoadingMentors">
              <v-select
                v-model="selectedMentorId"
                :items="formattedMentors"
                label="Select School"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip>
                  <span
                    v-if="index === 2"
                    class="text-grey text-caption align-self-center"
                  >
                    (+{{ selectedMentorId.length - 2 }} others)
                  </span>
                </template>
              </v-select>
            </div>
            <div v-else>Loading...</div>
          </div>
          <!-- speakers -->
          <div>
            <label for="event-speaker" class="form-label">Speakers</label>
            <div v-if="!isLoadingSpeakers">
              <v-select
                v-model="selectedSpeakerId"
                :items="formattedSpeakers"
                label="Select Speaker"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip>
                  <span
                    v-if="index === 2"
                    class="text-grey text-caption align-self-center"
                  >
                    (+{{ selectedSpeakerId.length - 2 }} others)
                  </span>
                </template>
              </v-select>
            </div>
            <div v-else>Loading...</div>
          </div>

          <!-- minitstries -->
          <div>
            <label for="event-ministry" class="form-label">Ministries</label>
            <div v-if="!isLoadingMinistries">
              <v-select
                v-model="selectedMinistryId"
                :items="formattedMinistries"
                label="Select Ministry"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip>
                  <span
                    v-if="index === 2"
                    class="text-grey text-caption align-self-center"
                  >
                    (+{{ selectedMinistryId.length - 2 }} others)
                  </span>
                </template>
              </v-select>
            </div>
            <div v-else>Loading...</div>
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
//customselet

const imagePreview = ref(null);
const fileInputRef = ref(null);
import { FormWizard, TabContent } from "vue3-form-wizard";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  createEvent,
  getAllSchools,
  getAllMentors,
  createEventSchool,
  createEventMentor,
  createEventSpeaker,
  getAllSpeakers,
  getAllMinstry,
  createEventMinistry,
} from "~/apiConfig/apiConfig";

const currentStep = ref(0);
const formWizard = ref(null);
const stepLength = 1;
const props = defineProps(["closeDialog"]);
//school states
const schools = ref([]);
const selectedSchoolId = ref([]);
const isLoading = ref(true);
const formattedSchools = ref([]);
//mentors states
const mentors = ref([]);
const isLoadingMentors = ref(true);
const selectedMentorId = ref([]);
const formattedMentors = ref([]);
//speaker states
const speakers = ref([]);
const isLoadingSpeakers = ref(true);
const selectedSpeakerId = ref([]);
const formattedSpeakers = ref([]);
//Ministries states
const ministries = ref([]);
const isLoadingMinistries = ref(true);
const selectedMinistryId = ref([]);
const formattedMinistries = ref([]);

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
//fetching data for schools,mentors,speaker,ministy
const fetchInitialData = async () => {
  try {
    //getting school list from db
    const schoolResponse = await getAllSchools();
    schools.value = schoolResponse.data;
    formatSchools();

    //getting mentors list from db
    const mentorResponse = await getAllMentors();
    mentors.value = mentorResponse.data;
    formatMentors();

    //getting speakers list from db

    const speakerResponse = await getAllSpeakers();
    speakers.value = speakerResponse.data;
    formatSpeakers();
    //getting ministries from db

    const ministryResponse = await getAllMinstry();
    ministries.value = ministryResponse.data;
    formatMinistries();

    //loading states for all selects
    isLoading.value = false;
    isLoadingMentors.value = false;
    isLoadingSpeakers.value = false;
    isLoadingMinistries.value = false;
  } catch (error) {
    console.error("Error fetching initial data:", error);
    isLoading.value = false;
    isLoadingMentors.value = false;
    isLoadingSpeakers.value = false;
    isLoadingMinistries.value = false;
  }
};

//formatting  data based on Vuetify multiple select input
const formatSchools = () => {
  formattedSchools.value = schools.value.map((school) => ({
    title: school.school_name,
    value: school.school_id,
  }));
};

const formatMentors = () => {
  formattedMentors.value = mentors.value.map((mentor) => ({
    title: mentor.mentor_name,
    value: mentor.mentor_id,
  }));
};
const formatSpeakers = () => {
  formattedSpeakers.value = speakers.value.map((speaker) => ({
    title: speaker.speaker_name,
    value: speaker.speaker_id,
  }));
};
const formatMinistries = () => {
  formattedMinistries.value = ministries.value.map((minister) => ({
    title: minister.ministry_name,
    value: minister.ministry_id,
  }));
};
const onFinish = async () => {
  try {
    const response = await createEvent(values.value);
    const eventId = response.data.data.event_id;

    //creation of related table event_school
    const selectedSchools = selectedSchoolId.value;
    console.log(selectedSchools, "selected shcools array");
    const eventSchoolPromises = selectedSchools.map(async (schoolId) => {
      try {
        await createEventSchool({ event_id: eventId, school_id: schoolId });
      } catch (error) {
        console.error("Error creating event_school record:", error);
        throw new Error("Failed to create event_school record");
      }
    });
    // Wait for all event_school records to be created
    await Promise.all(eventSchoolPromises);

    // Event_mentor table creation
    const selectedMentors = selectedMentorId.value;
    console.log(selectedMentors, "selected mentors array");
    const eventMentorPromise = selectedMentors.map(async (mentorId) => {
      try {
        await createEventMentor({ event_id: eventId, mentor_id: mentorId });
      } catch (error) {
        console.error("Error creating event_mentor record:", error);
        throw new Error("Failed to create event_mentor record");
      }
    });
    await Promise.all(eventMentorPromise);
    // Event_speaker table creation
    const selectedSpeakers = selectedSpeakerId.value;
    console.log(selectedSpeakers, "selected speakers array");
    const eventSpeakerPromise = selectedSpeakers.map(async (speakerId) => {
      try {
        await createEventSpeaker({ event_id: eventId, speaker_id: speakerId });
      } catch (error) {
        console.error("Error creating event_speaker record:", error);
        throw new Error("Failed to create event_speaker record");
      }
    });
    await Promise.all(eventSpeakerPromise);
    // Event ministry table creation
    const selectedMinistries = selectedMinistryId.value;
    console.log(selectedMinistries, "selected ministries array");
    const eventMinistryPromise = selectedMinistries.map(async (ministryId) => {
      try {
        await createEventMinistry({
          event_id: eventId,
          ministry_id: ministryId,
        });
      } catch (error) {
        console.error("Error creating event_ministry record:", error);
        throw new Error("Failed to create event_ministry record");
      }
    });
    await Promise.all(eventMinistryPromise);

    console.log("Form submitted:", response.data);
    props.closeDialog();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

onMounted(fetchInitialData);
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
