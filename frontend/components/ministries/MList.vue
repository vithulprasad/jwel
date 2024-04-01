<template>
  <div
    class="d-flex align-items-center justify-content-center mainCard rounded my-2"
  >
    <div class="pl-3 pt-3">
      <v-checkbox></v-checkbox>
    </div>

    <div class="flex-grow-1 ms-3">
      <div class="d-flex">
        <div class="flex-grow-1">
          <h5
            style="
              font-size: 1rem;
              line-height: 20px;
              font-weight: 500;
              color: #2f3e6d;
            "
            class="card-title"
          >
            {{ ministryValues.ministry_name }}
            
          </h5>
        </div>
        <div class="d-flex">
          <div class="pt-1">
            <v-chip color="green" size="small"> Active </v-chip>
          </div>

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
              <!-- <li>
                  <NuxtLink
                    class="dropdown-item"
                    :to="'/events/listEvents/' + eventValues.event_id"
                  >
                    View Details
                  </NuxtLink>
  
                </li> -->
              <li><a class="dropdown-item" href="#">User Status</a></li>

              <li><a class="dropdown-item" href="#">Edit</a></li>
              <li><a class="dropdown-item" href="#">Delete</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- icons -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["ministryValues"]);
</script>

<style scoped>
.mainCard {
  background-color: white;
  height: 100px;
}
.menu {
  border: 0cap !important;
  background: none !important;
}
/* .icon-text {
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
    } */
</style>
