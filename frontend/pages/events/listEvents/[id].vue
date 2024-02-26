<template>
  <div class="">
    <div class="row">
      <div
        :class="{ 'col-lg-6': isDialogOpen, 'col-lg-12': !isDialogOpen }"
        class="col-md-12 col-sm-12 pt-2"
      >
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
            <div class="container bg-white rounded">
              <div class="mt-2 pt-2 pb-2 d-flex align-items-center">
                <img src="/static/icon/arrow_back.svg" alt="" class="pt-2" />
                <a class="link pt-2 pl-1" href="">Back to Events</a>
              </div>
              <v-card class="mx-auto">
                <v-img
                  class="rounded"
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="100px"
                  cover
                ></v-img>

                <div class="flex-grow-1 ms-3 mt-2 pt-2">
                  <div class="d-flex">
                    <div class="flex-grow-1">
                      <h5 class="card-title event_title">
                        <!-- event name -->
                        <!-- Mock Parliment Debate -->
                        {{ events && events.data && events.data.event_name ? events.data.event_name : "Loading..." }}

                        <!-- {{ events?.data?.event_name || "Loading..." }} -->
                      </h5>
                    </div>
                    <div class="">
                      <div class="dropdown-center ms-auto">
                        <button
                          class="btn btn-secondary menu"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img src="/static/icon/more_vert.svg" alt="" />
                        </button>
                        <ul class="dropdown-menu" style="">
                          <li>
                            <a class="dropdown-item" href="#">View Details</a>
                          </li>
                          <li><a class="dropdown-item" href="#">Edit</a></li>
                          <li><a class="dropdown-item" href="#">Delete</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex">
                    <p class="card-text icon-text">
                      <!-- event venue -->
                      <small class="text-body-secondary"
                        ><img src="/static/icon/distance.svg" alt="" /> Wellness
                        Convention Center</small
                      >
                    </p>
                    <p class="card-text icon-text pl-2 ml-2">
                      <small class="text-body-secondary"
                        ><img src="/static/icon/account_circle.svg" alt="" /> 13
                        Joined</small
                      >
                    </p>
                    <p class="card-text pl-2 ml-2 icon-text">
                      <small class="text-body-secondary"
                        ><img src="/static/icon/theater_comedy.svg" alt="" />
                        Debate</small
                      >
                    </p>
                    <p class="card-text pl-2 ml-2 icon-text">
                      <small class="text-body-secondary"
                        ><img src="/static/icon/calendar_month.svg" alt="" /> 2
                        Days</small
                      >
                    </p>
                    <p class="card-text pl-2 ml-2 icon-text">
                      <small class="text-body-secondary"
                        ><img src="/static/icon/clinical_notes.svg" alt="" /> 13
                        yrs+</small
                      >
                    </p>
                  </div>
                </div>
              </v-card>

              <v-card>
                <v-tabs
                  v-model="tab"
                  color="deep-purple-accent-4"
                  align-tabs="start"
                >
                  <v-tab class="tabs_title" :value="1">Event Details</v-tab>
                  <v-tab class="tabs_title" :value="2">Parties</v-tab>
                  <v-tab class="tabs_title" :value="3">Alliance</v-tab>
                  <v-tab class="tabs_title" :value="4">Committee</v-tab>
                </v-tabs>
              </v-card>
            </div>
            <div class="">
              <template v-if="tab === 1">
                <EventDetails :eventDetails="events.data" />
              </template>
              <template v-else-if="tab === 2">
                <Parties @addPartyDilog="addPartyDilog" />
              </template>
              <template v-else-if="tab === 3">
                <Alliance />
              </template>
              <template v-else-if="tab === 4">
                <Committee />
              </template>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isDialogOpen" class="col-lg-6 col-md-12 col-sm-12 pt-2">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
            <EventsAddParty @closeDialog="closeDialog" />
            <!-- <EventsTestStepper  @closeDialog="closeDialog"/> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EventDetails from "~/components/events/EventDetails.vue";
import Alliance from "~/components/events/Alliance.vue";
import Parties from "~/components/events/Parties.vue";
import Committee from "~/components/events/Committee.vue";
import { getOneEvent } from "~/apiConfig/apiConfig";
defineProps(["isDialogOpen"]);

const tab = ref(null);
const events = ref(null);
const { id } = useRoute().params;

const addPartyDilog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
const fetchData = async () => {
  try {
    const res = await getOneEvent(id);
    events.value = res.data;
    console.log(events.value, "this is event name");
  } catch (error) {
    console.error("Error fetching events:", error.message);
  }
};

onMounted(() => {
  fetchData();
});
definePageMeta({
  layout: "main",
});
</script>

<style scoped>
.v-card {
  border-radius: 0%;
}
.v-card--variant-elevated {
  box-shadow: none !important;
}
.menu {
  border: 0cap !important;
  background: none !important;
}
.link {
  text-decoration: none;
  color: #1850c5;
  font-size: 12px;
  font-family: Inter;
  font-weight: 500;
  line-height: 14px;
  word-wrap: break-word;
}
.event_title {
  color: #2f3e6d;
  font-size: 24px;
  font-family: Inter;
  font-weight: 600;
  line-height: 32px;
  word-wrap: break-word;
}
/* .icon-text{
  color: #6E7CA8;
font-size: 0.75rem;
font-family: Inter;
font-weight: 500;
line-height: 14px;
word-wrap: break-word
} */
.tabs_title {
  color: #1850c5;
  font-size: 14px;
  font-family: Inter;
  font-weight: 600;
  line-height: 16px;
  word-wrap: break-word;
  text-transform: none;
}
</style>
