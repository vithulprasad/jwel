<template>
  <div class="d-flex justify-content-between align-items: center mt-2 pt-2">
    <h6 class="involved_parties">Involved Alliance</h6>
    <v-btn
      class="text-none text-subtitle-1"
      color="#5865f2"
      size="small"
      variant="flat"
      @click="addAllianceDialog"
    >
      Map party
    </v-btn>
  </div>
  <div class="mt-2">
    <div class="card mb-2">
      <div class="card-body d-flex">
        <div class="p-2">
          <img src="/static/img/eventPic.png" alt="" />
        </div>
        <div class="flex-grow-1">
          <div class="d-flex">
            <div class="">
              <h5 class="card-title party_title">
                <!-- party name -->
                {{ alliaceName }}
              </h5>
            </div>
            <div class="ms-auto">
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
            <!-- party tagline -->
            <p class="card-text pl-1 party_tag">
              {{ allianceTagline }}
            </p>
            <button @click="viewPartyDialog">00</button>
          </div>

          <div class="d-flex mt-2">
            <div>
              <v-chip pill link size="small">
                <v-avatar start>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/john.png"
                  ></v-img>
                </v-avatar>

                John Leider
                <v-chip class="ml-2" color="primary" size="x-small">
                  speaker</v-chip
                >
              </v-chip>
            </div>
            <div class="pl-4">
              <v-chip pill link size="small">
                <v-avatar start>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/john.png"
                  ></v-img>
                </v-avatar>

                20 members
              </v-chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let alliaceName = "this is alliance name";
let allianceTagline = "This is alliacne taghline";
const emit = defineEmits(["openAllianceDialog", "openViewDilog"]);

function addAllianceDialog() {
  emit("openAllianceDialog");
}
function viewPartyDialog() {
  emit("openViewDilog");
}
</script>

<style scoped>
.involved_parties {
  color: #3c4c7c;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
}
.party_title {
  color: #2f3e6d;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
}
.party_tag {
  color: #3c4c7c;
  font-size: 12px;
  font-family: Inter;
  font-weight: 500;
  line-height: 14px;
  word-wrap: break-word;
}
.menu {
  border: 0cap !important;
  background: none !important;
}
</style>
