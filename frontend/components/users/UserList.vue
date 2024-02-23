<template>
  <div
    :class="{ inactive: userStatus === 'inactive' }"
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
            <!-- student name -->
            {{ studentValues.student_name }}
          </h5>
        </div>
        <div class="d-flex">
          <div class="pt-1">
            <v-chip :color="chipColor" size="small">{{ chipText }}</v-chip>
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
              <!-- user status radio button -->
              <li>
                <div
                  class="form-switch d-flex justify-content-start align-items-center"
                >
                  <div>
                    <label class="mb-0">User Status</label>
                  </div>
                  <div>
                    <v-switch
                      v-model="model"
                      color="primary"
                      true-value="active"
                      false-value="inactive"
                      @change="toggleStatus"
                    ></v-switch>
                  </div>
                </div>
              </li>

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
            ><img src="/static/user_icons/mail.svg" alt="" />
            {{ studentValues.email_address }}</small
          >
        </p>
        <p class="card-text pl-2 ml-2 icon-text">
          <small class="text-body-secondary"
            ><img src="/static/user_icons/call.svg" alt="" />
            {{ studentValues.phone_number }}
          </small>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { updateUserStatus } from "../../apiConfig/apiConfig";
const props = defineProps(["studentValues"]);

const userStatus = ref(props.studentValues.student_status);

// Computed properties to determine chip color and text based on user's status
const chipColor = computed(() =>
  userStatus.value === "active" ? "green" : "grey"
);
const chipText = computed(() =>
  userStatus.value === "active" ? "Active" : "Inactive"
);

//  reactive reference for the switch model
const model = ref(userStatus.value);

// Watch for changes in userStatus and update model accordingly
watch(userStatus, (newValue) => {
  model.value = newValue;
});

// Method to toggle user's status
const toggleStatus = async () => {
  console.log(props.studentValues.student_id, "User ID");
  console.log(userStatus.value, "Current user status");
  try {
    // Toggle the user status
    const newStatus = userStatus.value === "active" ? "inactive" : "active";
    console.log(newStatus, "New student status");

    // Update the user status in the database
    await updateUserStatus(props.studentValues.student_id, newStatus);

    // Update userStatus after updating in the database
    userStatus.value = newStatus;
    console.log(
      userStatus.value,
      "userStatus.value =newStatus after db update"
    );
  } catch (error) {
    console.error("Error toggling user status:", error);
  }
};
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
.inactive {
  opacity: 0.5;
}
</style>
