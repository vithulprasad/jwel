<template>
  <div class="container bg-white rounded shadow" style="max-height: 100%">
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center">
        <h4>School Details</h4>
        <button class="btn" @click="closeViewDilog">
          <img src="/static/icon/close_button.svg" alt="" />
        </button>
      </div>
      <div class="d-flex align-items-center">
        <div class="p-2">
          <img
            src="https://cloudfour.com/examples/img-currentsrc/images/kitten-large.png"
            alt="Girl in a jacket"
            width="50"
            height="50"
          />
        </div>
        <div class="p-2"><h5>School name</h5></div>
        <div class="ms-auto p-2">
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
              <li><a class="dropdown-item" href="#">School Status</a></li>

              <li>
                <a class="dropdown-item" href="#">Edit</a>
              </li>
              <li><a class="dropdown-item" href="#">Delete</a></li>
            </ul>
          </div>
        </div>
      </div>
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
    <!-- buttons to toggle -->
    <div class="container chips d-flex">
      <div class="flex-grow-1">
        <button
          v-for="(chip, index) in chips"
          :key="index"
          :class="[
            'btn',
            'btn-sm',
            'chip',
            {
              'btn-primary': isSelected(chip.label),
              'btn-secondary': !isSelected(chip.label),
            },
          ]"
          @click="selectComponent(chip.label)"
        >
          {{ chip.label }}
        </button>
      </div>
    </div>
    <!-- Student or More Details Component -->
    <div v-if="selectedComponent === 'Students'">
      <div
        v-for="student in studentResponse"
        :key="student.student_id"
        class="d-flex align-items-center p-1"
      >
        <img
          class="userImg"
          src="https://cloudfour.com/examples/img-currentsrc/images/kitten-large.png"
          alt=""
          width="50"
          height="50"
        />

        <p class="pl-3 pt-2">{{ student.student_name }}</p>
      </div>
    </div>
    <div v-else>
      <!-- school address -->
      <div>
        <small>School address</small>
        <p>{{ schoolResponse.school_addres }}</p>
      </div>
      <!-- Principla details -->
      <div>
        <h6>Principal Details</h6>
        <small>Name</small>
        <p>{{ schoolResponse.principal_name }}</p>
        <small>Email Address</small>
        <p>{{ schoolResponse.principal_email }}</p>
        <small>contact</small>
        <p>{{ schoolResponse.principal_phone_number }}</p>
      </div>
      <!--Vice Principla details -->
      <div>
        <h6>Vice Principal Details</h6>

        <small>Name</small>
        <p>{{ schoolResponse.vice_name }}</p>
        <small>Email Address</small>
        <p>{{ schoolResponse.vice_email }}</p>
        <small>contact</small>
        <p>{{ schoolResponse.vice_phone_number }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getSchoolById, getUserBySchool } from "~/apiConfig/apiConfig";
import { ref } from "vue";

const emit = defineEmits(["closeViewSchool"]);
const props = defineProps(["schoolId"]);
let studentResponse = ref([]);
let schoolResponse = ref(null);

const closeViewDilog = () => {
  emit("closeViewSchool");
};
const selectedComponent = ref("Students");
const selectComponent = (label) => {
  selectedComponent.value = label;
};
const isSelected = (label) => {
  return selectedComponent.value === label;
};
const chips = ref([{ label: "Students" }, { label: "More Details" }]);
const fetchInitialData = async () => {
  try {
    const response = await getSchoolById(props.schoolId);
    schoolResponse.value = response.data;
    console.log(schoolResponse, "shcool fetched by id");
    const students = await getUserBySchool(props.schoolId);
    studentResponse.value = students.data;
  } catch (error) {
    console.error(error, "Error in fetcing inital data");
  }
};
onMounted(fetchInitialData);
</script>

<style scoped>
.menu {
  border: 0cap !important;
  background: none !important;
}
.chip {
  border-radius: 8px;
}
.chips {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.userImg {
  border-radius: 50%;
}
</style>
