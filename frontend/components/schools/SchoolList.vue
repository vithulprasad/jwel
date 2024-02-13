<template>
  <div
    class="d-flex align-items-center justify-content-center mainCard rounded my-2"
  >
    <div class="pl-3 pt-3">
      <v-checkbox></v-checkbox>
    </div>
    <div class="flex-shrink-0 m-2 p-2">
      <!-- <img src="..." alt="..." /> -->
      <svg
        class="bd-placeholder-img rounded"
        width="80"
        height="80"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: Image"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#e5e5e5"></rect>
        <text x="50%" y="50%" fill="#999" dy=".3em">Image</text>
      </svg>
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
            {{ schoolValues.school_name }}
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
              <li><a class="dropdown-item" href="#">School Status</a></li>

              <li><a class="dropdown-item" href="#">Edit</a></li>
              <li><a class="dropdown-item" href="#">Delete</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- icons -->
      <div class="d-flex">
        <p class="card-text icon-text">
          <small class="text-body-secondary"
            ><img src="/static/user_icons/mail.svg" alt="" /> 13
            lorri73@gmail.com</small
          >
        </p>
        <p class="card-text pl-2 ml-2 icon-text">
          <small class="text-body-secondary"
            ><img src="/static/user_icons/call.svg" alt="" />
            (904) 335-2403
          </small>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["schoolValues"]);
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
